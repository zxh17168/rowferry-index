#!/bin/sh
set -eu
cd "$(dirname "$0")"
# Original procedural colour study and original quiet electronic tone.
# -n preserves an existing film; remove it deliberately before regenerating.
ffmpeg -n -hide_banner -loglevel error \
  -f lavfi -i 'gradients=s=1280x720:r=24:c0=0xf2dfb5:c1=0xf17853:c2=0x26214f:c3=0x756ca2:n=4:t=spiral:speed=0.025:seed=17168:d=18' \
  -f lavfi -i 'sine=frequency=196:sample_rate=44100:duration=18' \
  -vf 'format=yuv420p' -af 'volume=0.04,afade=t=in:d=2,afade=t=out:st=15:d=3' \
  -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 96k \
  -movflags +faststart -shortest public/chromatic-drift.mp4
