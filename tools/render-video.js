#!/usr/bin/env node
// Render one of the films (index.html, civilization.html) to a video file.
//
// Every frame of a film is a pure function of time, so this steps it at
// 30 fps in headless Chromium, pipes the frames to ffmpeg, and muxes in the
// soundtrack that the page's own synth renders offline.
//
//   npm i playwright && npx playwright install chromium
//   node tools/render-video.js [page.html] [out.mp4] [width] [height]
//
// Defaults: index.html → media/yourworld.mp4, civilization.html → media/civilization.mp4, 1920 × 1080.
//
// Needs ffmpeg on PATH, or FFMPEG=/path/to/ffmpeg.
// Behind a TLS-intercepting proxy the browser doesn't trust, set
// FONTS_VIA_CURL=1 to fetch Google Fonts with curl (system CA bundle) instead.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const pageFile = args[0] && /\.html?$/.test(args[0]) ? args.shift() : 'index.html';
const name = path.basename(pageFile).replace(/\.html?$/, '');
const out = path.resolve(args[0] || path.join(root, 'media', (name === 'index' ? 'yourworld' : name) + '.mp4'));
const W = Number(args[1] || 1920), H = Number(args[2] || 1080), FPS = 30, BATCH = 12;
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

async function routeFontsViaCurl(page) {
  const cache = new Map();
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, async route => {
    const url = route.request().url();
    try {
      if (!cache.has(url)) {
        const ua = route.request().headers()['user-agent'];
        cache.set(url, execFileSync('curl', ['-sSfL', '--max-time', '30', '-A', ua, url], { maxBuffer: 64 << 20 }));
      }
      const css = url.includes('googleapis');
      await route.fulfill({
        status: 200, body: cache.get(url),
        headers: { 'content-type': css ? 'text/css; charset=utf-8' : 'font/woff2', 'access-control-allow-origin': '*' },
      });
    } catch (e) {
      await route.abort();
    }
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  if (process.env.FONTS_VIA_CURL) await routeFontsViaCurl(page);
  await page.goto('file://' + path.resolve(root, pageFile) + '#export');
  await page.waitForFunction(() => window.__film);
  await page.evaluate(() => window.__film.ready());
  const total = await page.evaluate(() => window.__film.total);

  const wav = path.join(os.tmpdir(), `yourworld-${process.pid}.wav`);
  fs.writeFileSync(wav, Buffer.from(await page.evaluate(() => window.__film.soundtrack()), 'base64'));
  await page.evaluate(([w, h]) => window.__film.size(w, h), [W, H]);

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn(FFMPEG, [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', wav, '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-tune', 'animation', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const exited = new Promise(resolve => ff.on('close', resolve));

  const frames = Math.ceil(total * FPS);
  for (let i = 0; i < frames; i += BATCH) {
    const jpegs = await page.evaluate(([from, n, fps, total]) => {
      const canvas = document.getElementById('film'), list = [];
      for (let k = from; k < from + n; k++) {
        window.__film.frame(Math.min(k / fps, total - 1e-4));
        list.push(canvas.toDataURL('image/jpeg', 0.95).split(',')[1]);
      }
      return list;
    }, [i, Math.min(BATCH, frames - i), FPS, total]);
    for (const b64 of jpegs) {
      if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    process.stdout.write(`\rframe ${Math.min(i + BATCH, frames)} / ${frames}`);
  }
  ff.stdin.end();
  const code = await exited;
  fs.rmSync(wav, { force: true });
  await browser.close();
  process.stdout.write('\n');
  if (errors.length) console.error('page errors:', errors);
  if (code !== 0) { console.error('ffmpeg exited with', code); process.exit(1); }
  console.log('wrote', path.relative(process.cwd(), out));
})();
