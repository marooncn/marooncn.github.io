#!/usr/bin/env bash
# 新建 Blog 文章：scripts/new-post.sh "文章标题" [english-slug]
# 生成 _posts/YYYY-MM-DD-slug.md，并创建对应图片目录 img/posts/slug/
set -euo pipefail
title="${1:?用法: scripts/new-post.sh \"文章标题\" [english-slug]}"
slug="${2:-$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-|-$//g')}"
[ -z "$slug" ] && { echo "中文标题请提供英文 slug，如：scripts/new-post.sh \"标题\" vla-survey"; exit 1; }
cd "$(dirname "$0")/.."
date=$(date +%Y-%m-%d)
file="_posts/${date}-${slug}.md"
[ -e "$file" ] && { echo "已存在：$file"; exit 1; }
mkdir -p "img/posts/${slug}"
cat > "$file" <<EOT
---
title: "${title}"
description: ""            # 可选：标题下方的一句话副标题
summary: ""                # 可选：列表页摘要，留空则自动截取正文开头
date: ${date}
math: false                # 有公式时改为 true
# toc: false               # 关闭目录
# citation: false          # 关闭文末引用
# last_modified_at: ${date}  # 更新文章时填写
---

正文从这里开始。图片放在 img/posts/${slug}/，引用：![说明](/img/posts/${slug}/xxx.png)
EOT
echo "已创建 $file"
