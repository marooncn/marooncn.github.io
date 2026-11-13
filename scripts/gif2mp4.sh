#!/usr/bin/env bash
# GIF → MP4（H.264），体积通常缩小 80%+，网页中用 <video> 循环播放。
# 用法：scripts/gif2mp4.sh input.gif [output.mp4] [max_width=720]
# 依赖 ffmpeg：brew install ffmpeg，或 pip install imageio-ffmpeg 后设置 FFMPEG 环境变量
set -euo pipefail
in="$1"; out="${2:-${in%.*}.mp4}"; w="${3:-720}"
FFMPEG="${FFMPEG:-ffmpeg}"
# scale：宽度不超过 max_width，且宽高为偶数（H.264 要求）
"$FFMPEG" -y -loglevel error -i "$in" -movflags +faststart -pix_fmt yuv420p \
  -vf "scale='min($w,iw)':-2:flags=lanczos,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
  -c:v libx264 -crf 26 -preset slow -an "$out"
printf '%s (%s) -> %s (%s)\n' "$in" "$(du -h "$in" | cut -f1)" "$out" "$(du -h "$out" | cut -f1)"
