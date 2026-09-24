# 小橘块眼中的世界

一部 1 分 42 秒的像素短片：Claude Code 终端里那只橘色的小方块（源码里叫 clawd），是怎么看你的项目的。

[![小橘块眼中的世界](media/poster.jpg)](media/yourworld.mp4)

▶ [看视频（MP4，1080p，带音效）](media/yourworld.mp4)，或者用浏览器打开 [`index.html`](index.html)，可以暂停、拖动、按章节跳转。

## 故事

你在终端里敲下一句「登录按钮点了没反应，帮我看看？」。镜头推进小橘块的眼睛，在它眼里，这是一整个世界：

| 幕 | 它眼中 | 其实是 |
|---|---|---|
| 序 · 你看到的终端 | 一只刚眨了下眼的小橘块 | 启动 `claude`，敲下一句话 |
| 一 · 天上掉下来的信 | 从天而降的信，头顶转个不停的小星星 | 你发出的提示词；思考时的 `✻ Pondering…` |
| 二 · 文件之城 | 一栋栋楼、一扇扇窗、手电筒、望不到顶的山 | 文件夹和文件、`Search`（grep）、`node_modules` |
| 三 · 代码的地形 | 台阶、虫子、敲门、蝴蝶 | 缩进、bug、改动前的权限确认、`Update` 改代码 |
| 四 · 测试花园 | 一朵接一朵开的花 | `npm test`，8 个测试逐个通过 |
| 五 · 天灯 | 放上天空、连成星座的灯 | `git commit` 和 `git push`，提交历史 |
| 六 · 折起来的记忆 | 满天的字，被折成一个小方块 | 上下文快满时的自动压缩（`Compacting conversation…`） |
| 终 · 你的世界 | 回到输入框旁边，等你开口 | 汇报做了什么，然后等你的下一句话 |

片中的 bug 真的会让按钮「点了没反应」：`handleClick` 里写成了 `await onLogin`，少了一对括号，函数从来没被调用。

| | | |
|---|---|---|
| ![文件之城](media/still-city.jpg) | ![代码的地形](media/still-code.jpg) | ![天灯](media/still-lantern.jpg) |

## 从 Claude Code 里照搬的细节

- **小橘块的造型**：按 CLI 启动横幅里的三行字符画 ` ▐▛███▜▌` / `▝▜█████▛▘` / `  ▘▘ ▝▝` 还原。一个象限块是 1 像素宽、2 像素高，所以它是 16×10 的精灵，眼睛是两道竖缝。序章终端里的它就是用这三行字符拼出来的，眨眼时把眼睛那个缺角补满。
- **颜色**：身体是 `clawd_body` 的 `rgb(215,119,87)`；权限框的蓝紫、bash 的粉色、diff 的红绿，都取自 Claude Code 暗色主题。
- **转圈的小星星**：思考时的 `· ✢ ✳ ✶ ✻ ✽` 先正着再倒着循环，每帧 120 毫秒；飘出来的词（Pondering、Noodling、Percolating、Spelunking…）也来自它自己的词表。
- **界面文字**：`Do you want to make this edit to …?`、`Context left until auto-compact`、`Compacting conversation…`、`? for shortcuts` 都是原样。

## 怎么看

- 直接用浏览器打开 `index.html`。字体从 Google Fonts 加载；断网也能播放，只是会换成系统字体。
- `空格` 播放 / 暂停，`←` `→` 快退 / 快进 5 秒，点画面也能暂停；播放条右边可以打开声音。
- 在地址后面加 `#sky`、`#city`、`#code`、`#tests`、`#lantern`、`#compact`、`#finale`，可以直接从某一幕开始。
- 想放到网上：把这个分支合进默认分支后，在仓库 Settings → Pages 里选默认分支的根目录，就能用 GitHub Pages 打开。

## 怎么做的

- 整部片子就是一个 `index.html`，用 Canvas 2D 画像素，不依赖任何库。
- 每一帧只由时间决定，随机数也用固定种子，所以可以随意拖动，也能逐帧导出。
- 视频用 [`tools/render-video.js`](tools/render-video.js) 生成：无头 Chromium 按 30 帧 / 秒逐帧渲染 1920×1080 的画面，ffmpeg 编码成 H.264；音效由页面里同一套 WebAudio 小合成器离线渲染后混进去。

  ```sh
  npm i playwright && npx playwright install chromium
  node tools/render-video.js            # 需要 PATH 里有 ffmpeg
  ```

> 这是一部非官方的同人短片，不代表 Anthropic 官方。
