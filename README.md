# yourworld

两部关于 Claude Code 吉祥物小橘块（源码里叫 clawd）的像素短片。每一部都是一个 HTML 文件，用浏览器打开就能看。

| 之一 | 之二 |
|---|---|
| [![小橘块眼中的世界](media/poster.jpg)](media/yourworld.mp4) | [![小橘块眼中的人类文明](media/civ-poster.jpg)](media/civilization.mp4) |
| **《小橘块眼中的世界》** · 1 分 42 秒<br>你在终端里敲下一句话，它走进你的项目：找文件、修 bug、跑测试、提交。<br>[看视频](media/yourworld.mp4) · [网页版](index.html) | **《小橘块眼中的人类文明》** · 2 分 09 秒<br>有人问它，人类文明在你眼里是什么样的。它带你看了绘画、音乐、文学、舞蹈、建筑和电影。<br>[看视频](media/civilization.mp4) · [网页版](civilization.html) |

## 之一 · 小橘块眼中的世界

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

## 之二 · 小橘块眼中的人类文明

有人在终端里问它：「人类文明在你眼里，是什么样的？」它想了很久，然后带你去看。每一幕里，作品先以它读到的样子出现，是颜色编号、频率、坐标和数字，然后才慢慢变成你们看到的样子。

| 幕 | 作品 | 它看到的 | 它慢慢明白的 |
|---|---|---|---|
| 一 · 绘画 | 洞穴手印、山水画、梵高《星月夜》 | `#15285A #2C4F96 #F4E27C …` | 画的不是东西的样子，是看的时候的心情 |
| 二 · 音乐 | 贾湖骨笛、古琴、巴赫《C 大调前奏曲》 | `C4 261.6 · E4 329.6 Hz` | 几个音，能让人想起一个很远的人 |
| 三 · 文学 | 甲骨文「月」、李白《静夜思》、一条书的河 | `U+6708` | 抬头看月亮的时候，人会想家 |
| 四 · 舞蹈 | 马家窑舞蹈纹彩陶盆、水袖、世界各地的舞 | `右手 (0.58, 0.36)` | 跳舞，是用整个身体说话 |
| 五 · 建筑 | 金字塔、帕特农神庙、长城、应县木塔、哥特教堂、摩天楼 | `约 2,300,000 块石头` | 盖房子，是想让后来的人知道你们来过 |
| 六 · 电影 | 迈布里奇的马、《火车进站》、《月球旅行记》 | `一秒 24 张照片` | 电影让别人透过你的眼睛看世界 |

它在山水画上学乾隆盖了个「小橘之印」，看火车进站时吓得躲到了椅子后面。最后它回到终端写下回答，还顺手改了一首诗：

> 光标一点光，疑是地上霜。
> 举头望人类，低头慢慢想。

| | | |
|---|---|---|
| ![洞穴岩画](media/civ-cave.jpg) | ![古琴与巴赫](media/civ-piano.jpg) | ![静夜思](media/civ-poem.jpg) |
| ![水袖](media/civ-sleeves.jpg) | ![一条天际线](media/civ-skyline.jpg) | ![电影院](media/civ-cinema.jpg) |

片中的作品都已进入公有领域，画面是像素风格的致敬重绘。音乐有贾湖骨笛式的五声旋律、巴赫《C 大调前奏曲》、民歌《茉莉花》、帕赫贝尔《卡农》的和声、乔普林《艺人》和贝多芬《欢乐颂》，都是简化演奏，全部由页面里的小合成器实时发声，所以这一部建议打开声音看。

## 从 Claude Code 里照搬的细节

- **小橘块的造型**：按 CLI 启动横幅里的三行字符画 ` ▐▛███▜▌` / `▝▜█████▛▘` / `  ▘▘ ▝▝` 还原。一个象限块是 1 像素宽、2 像素高，所以它是 16×10 的精灵，眼睛是两道竖缝。序章终端里的它就是用这三行字符拼出来的，眨眼时把眼睛那个缺角补满。
- **颜色**：身体是 `clawd_body` 的 `rgb(215,119,87)`；权限框的蓝紫、bash 的粉色、diff 的红绿，都取自 Claude Code 暗色主题。
- **转圈的小星星**：思考时的 `· ✢ ✳ ✶ ✻ ✽` 先正着再倒着循环，每帧 120 毫秒；飘出来的词（Pondering、Noodling、Percolating、Spelunking…）也来自它自己的词表。
- **界面文字**：`Do you want to make this edit to …?`、`Context left until auto-compact`、`Compacting conversation…`、`? for shortcuts` 都是原样。

## 怎么看

- 直接用浏览器打开 `index.html` 或 `civilization.html`。字体从 Google Fonts 加载；断网也能播放，只是会换成系统字体。
- `空格` 播放 / 暂停，`←` `→` 快退 / 快进 5 秒，点画面也能暂停；播放条右边可以开关声音。
- 在地址后面加一幕的名字，可以直接从那一幕开始：
  - 之一：`#sky`、`#city`、`#code`、`#tests`、`#lantern`、`#compact`、`#finale`
  - 之二：`#painting`、`#music`、`#literature`、`#dance`、`#architecture`、`#film`、`#finale`
- 想放到网上：把这个分支合进默认分支后，在仓库 Settings → Pages 里选默认分支的根目录，就能用 GitHub Pages 打开。

## 怎么做的

- 两部片子都是 Canvas 2D，不依赖任何库。每一帧只由时间决定，随机数也用固定种子，所以可以随意拖动，也能逐帧导出。
- 之二里用到的几种画法：梵高的天空是约 1,800 笔按时间旋转的笔触；作品出场时先把画面缩成色块、读出颜色编号，再一级级变清楚；水袖是舞者手腕过去一秒的轨迹；古琴的声音是 Karplus–Strong 拨弦合成。
- 视频用 [`tools/render-video.js`](tools/render-video.js) 生成：无头 Chromium 按 30 帧 / 秒逐帧渲染 1920×1080 的画面，ffmpeg 编码成 H.264；声音由页面里同一套 WebAudio 合成器离线渲染后混进去。

  ```sh
  npm i playwright && npx playwright install chromium
  node tools/render-video.js index.html          # → media/yourworld.mp4
  node tools/render-video.js civilization.html   # → media/civilization.mp4
  ```

  需要 PATH 里有 ffmpeg，或者用 `FFMPEG=/path/to/ffmpeg` 指定。

> 这是两部非官方的同人短片，不代表 Anthropic 官方。
