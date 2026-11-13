# marooncn.github.io

个人主页 + Blog，基于 Jekyll，托管在 GitHub Pages：push 后自动构建，1～2 分钟生效。

- 主页：https://marooncn.github.io/
- Blog：https://marooncn.github.io/blog/

## 目录结构

```
├── _config.yml           # 全局配置：站点信息、Blog 名称/导航、文章默认参数
├── _data/                # ★ 主页内容，日常只改这里
│   ├── profile.yml       #   姓名、头像、联系方式、链接、Biography
│   ├── experience.yml    #   工作经历
│   ├── publications.yml  #   论文
│   ├── education.yml     #   教育经历
│   └── projects.yml      #   项目
├── _posts/               # ★ Blog 文章（YYYY-MM-DD-slug.md）
├── _drafts/              #   草稿（不发布），含写作样式参考
├── img/                  #   图片 / 视频；文章图片放 img/posts/<slug>/
├── index.html            #   主页骨架（调整区块顺序 / 隐藏区块）
├── blog/                 #   Blog 文章列表页
├── _layouts/ _includes/  #   模板（一般不用动）
├── assets/css, assets/js #   样式与脚本
└── scripts/              #   辅助脚本（不发布）
```

## 常见操作

### 修改主页内容
直接编辑 `_data/*.yml`，每个文件顶部都有字段说明。注意事项：

| 规则 | 示例 |
|---|---|
| 文本支持 Markdown | `**加粗**`、`[链接](https://...)` |
| 红色强调 | `<mark>首个上高架桥的全无人自动驾驶汽车</mark>` |
| 以 `*`、`[`、`{` 开头或含 `: ` 的文本**必须加双引号** | `- "**Neural Planner**：..."` |
| 中文段落写在**同一行**，不要折行（折行处会出现多余空格） | |
| 缩进只能用空格，同级对齐 | |

新增一段工作经历：在 `experience.yml` 顶部复制一个 `- period: ...` 块后修改；可加配图：

```yaml
  media:
    - img/divla-arch.png
    - { src: img/divla-demo.mp4, caption: 真机演示 }
```

调整区块顺序 / 隐藏区块：编辑根目录 `index.html` 中的 `include` 行。

### 写 Blog 文章
```bash
scripts/new-post.sh "文章标题" english-slug   # 生成 _posts/2026-11-11-english-slug.md
```
front matter 常用字段：

| 字段 | 说明 |
|---|---|
| `title` | 标题 |
| `description` | 标题下的副标题（可选） |
| `summary` | 列表页摘要（可选，默认截取正文开头） |
| `math: true` | 启用公式（MathJax） |
| `toc: false` | 关闭目录（默认开启，根据 h2/h3 生成） |
| `citation: false` | 关闭文末引用（默认开启） |
| `last_modified_at` | 更新日期 |

写作要点（完整示例见 `_drafts/markdown-style-guide.md`）：
- 正文从 `##` 二级标题开始分节（`#` 留给文章标题）。
- 公式：行内和独立公式都用 `$$...$$`；独立公式单独成段。
- 图片：`![说明](/img/posts/<slug>/xxx.png)`，下一行写 `*图 1：...*` 作为图注。
- 视频：`<video src="/img/posts/<slug>/demo.mp4" autoplay loop muted playsinline></video>`。

### 图片 / 视频
- 大 GIF 先转 MP4（体积一般缩小 80% 以上）：`scripts/gif2mp4.sh in.gif [out.mp4] [最大宽度=720]`。
- 普通图片宽度控制在 1600px 以内，macOS 可用：`sips --resampleWidth 1600 xxx.png`。

## 本地预览

首次安装（macOS 自带 Ruby 2.6）：

```bash
gem install --user-install bundler -v 2.4.22
# 系统 Ruby 编译原生扩展需要指定 SDK（Homebrew Ruby 不需要这两行）
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
export SDKROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX14.5.sdk
~/.gem/ruby/2.6.0/bin/bundle _2.4.22_ config set --local path vendor/bundle
~/.gem/ruby/2.6.0/bin/bundle _2.4.22_ install
```

日常预览：

```bash
~/.gem/ruby/2.6.0/bin/bundle _2.4.22_ exec jekyll serve --livereload           # http://localhost:4000
~/.gem/ruby/2.6.0/bin/bundle _2.4.22_ exec jekyll serve --livereload --drafts  # 含草稿
```

可以在 `~/.zshrc` 里加别名：`alias jk='~/.gem/ruby/2.6.0/bin/bundle _2.4.22_ exec jekyll'`，之后用 `jk serve --livereload`。

> 修改 `_config.yml` 后需重启 serve；本地预览时文末 BibTeX 里显示的 localhost 地址，线上会变成正式域名。

## 发布

```bash
git add -A && git commit -m "update: xxx" && git push
```
也可以直接在 github.com 网页上编辑文件并提交。构建状态在仓库的 Actions 页面查看，构建失败时 GitHub 会发邮件通知（常见原因是 YAML 缩进或引号错误）。

## 绑定自定义域名（可选）
1. 在根目录新建 `CNAME` 文件，内容为域名，如 `www.example.com`。
2. DNS 添加 CNAME 记录：`www` → `marooncn.github.io`。
3. 修改 `_config.yml` 中的 `url`，然后在仓库 Settings → Pages 勾选 Enforce HTTPS。
