#!/bin/bash
# ──────────────────────────────────────────────────────────────
# VILINS — Media preparation for scroll storytelling
#
# 1. Re-encodes hero.mp4 from HEVC → H.264 (Firefox/universal)
# 2. Extracts WebP frame sequences from scene videos for canvas
#
# Requires: ffmpeg, cwebp
# Run once after cloning or after updating video assets:
#   bash scripts/prepare-media.sh
# ──────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_DIR="$PROJECT_DIR/public"
SCENES_DIR="$PUBLIC_DIR/scene"
FRAMES_DIR="$PUBLIC_DIR/frames"

echo "=== VILINS Media Preparation ==="
echo ""

# ── 1. Hero: HEVC → H.264 ────────────────────────────────────
HERO="$PUBLIC_DIR/hero.mp4"
if [ -f "$HERO" ]; then
  codec=$(ffprobe -v quiet -select_streams v:0 \
    -show_entries stream=codec_name -of csv=p=0 "$HERO" 2>/dev/null || echo "unknown")

  if [ "$codec" = "hevc" ] || [ "$codec" = "h265" ]; then
    echo "[hero] Current codec: $codec — re-encoding to H.264..."
    HERO_TMP="$PUBLIC_DIR/.hero-h264-tmp.mp4"

    ffmpeg -i "$HERO" \
      -c:v libx264 -crf 23 -preset medium \
      -pix_fmt yuv420p -movflags +faststart \
      -an \
      "$HERO_TMP" -y -loglevel warning

    mv "$HERO" "$PUBLIC_DIR/hero-hevc-backup.mp4"
    mv "$HERO_TMP" "$HERO"
    echo "[hero] ✓ hero.mp4 → H.264  (backup: hero-hevc-backup.mp4)"
  else
    echo "[hero] ✓ Already $codec — skipping"
  fi
else
  echo "[hero] ⚠ hero.mp4 not found"
fi
echo ""

# ── 2. Scene videos → WebP frames (via PNG → cwebp) ──────────
mkdir -p "$FRAMES_DIR"

for video in "$SCENES_DIR"/*_video_*.mp4; do
  [ -f "$video" ] || continue

  filename=$(basename "$video" .mp4)
  out_dir="$FRAMES_DIR/$filename"

  if [ -d "$out_dir" ] && [ -f "$out_dir/count.txt" ]; then
    count=$(cat "$out_dir/count.txt")
    echo "[frames] $filename: ✓ ($count frames)"
    continue
  fi

  mkdir -p "$out_dir"
  tmp_dir="$out_dir/.png_tmp"
  mkdir -p "$tmp_dir"

  echo -n "[frames] $filename: extracting PNG..."
  ffmpeg -i "$video" \
    -vf "scale=960:-2:flags=lanczos" \
    "$tmp_dir/%03d.png" \
    -y -loglevel warning
  echo " converting to WebP..."

  for png in "$tmp_dir"/*.png; do
    base=$(basename "$png" .png)
    cwebp -q 80 -m 4 -quiet "$png" -o "$out_dir/${base}.webp"
  done

  rm -rf "$tmp_dir"

  count=$(ls -1 "$out_dir"/*.webp 2>/dev/null | wc -l | tr -d ' ')
  echo "$count" > "$out_dir/count.txt"
  echo "[frames]   → $count frames"
done

echo ""
echo "=== Summary ==="
for d in "$FRAMES_DIR"/*/; do
  [ -d "$d" ] || continue
  c=$(cat "$d/count.txt" 2>/dev/null || echo "?")
  s=$(du -sh "$d" 2>/dev/null | cut -f1)
  echo "  $(basename "$d"): $c frames ($s)"
done
echo ""
echo "Done!"
