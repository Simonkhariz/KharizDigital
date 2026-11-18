// Turns a scroll-driven video into still frames. Run with: npm run frames
//
// Scrubbing a <video> by setting currentTime does not work on iPhones (Safari
// shows nothing until the video has been played) and stutters on Android
// (every scroll step makes the phone decode a new frame). Drawing still images
// onto a canvas is smooth everywhere, so the demo uses frames instead.
//
// For each entry below it writes, next to the other demo images:
//   <out>/wide/001.webp ...  1280px wide, for landscape screens
//   <out>/tall/001.webp ...  the centre of the picture in portrait (608x1080), for phones
//   <out>-poster.jpg         the first frame, shown while the frames load
// The source videos live in media/videos/, which is not published.
//
// If you change FPS, update `frameCount` where the frames are used
// (the script prints the count).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const ROOT = path.join(import.meta.dirname, "..");
const FPS = 15;

const VIDEOS = [
  {
    source: "media/videos/luxury-real-estate-hero.mp4",
    out: "public/images/luxury-real-estate/hero-frames",
  },
];

const run = (args) =>
  execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

for (const { source, out } of VIDEOS) {
  const input = path.join(ROOT, source);
  const outDir = path.join(ROOT, out);
  fs.rmSync(outDir, { recursive: true, force: true });
  const webp = ["-c:v", "libwebp", "-quality", "75", "-compression_level", "6"];
  const sets = {
    wide: `fps=${FPS},scale='min(1280,iw)':-2`,
    // The middle of the picture at 9:16, which is all a portrait screen shows.
    tall: `fps=${FPS},crop='min(iw,ih*9/16)':ih`,
  };
  for (const [name, filter] of Object.entries(sets)) {
    fs.mkdirSync(path.join(outDir, name), { recursive: true });
    run(["-i", input, "-vf", filter, ...webp, path.join(outDir, name, "%03d.webp")]);
  }
  run(["-i", input, "-frames:v", "1", "-vf", "scale='min(1280,iw)':-2", "-q:v", "4", `${outDir}-poster.jpg`]);

  const count = fs.readdirSync(path.join(outDir, "wide")).length;
  const size = (dir) =>
    fs.readdirSync(dir).reduce((total, file) => total + fs.statSync(path.join(dir, file)).size, 0);
  const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  console.log(
    `${out}: ${count} frames; wide ${mb(size(path.join(outDir, "wide")))}, tall ${mb(size(path.join(outDir, "tall")))}`,
  );
}
