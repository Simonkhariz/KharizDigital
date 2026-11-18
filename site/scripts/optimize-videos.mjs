// Makes the demo videos quicker to start. Run with: npm run videos
//
// For every .mp4 under public/images it:
// 1. Re-encodes it without changing what you see: same size, same frame rate,
//    every frame kept (H.264, CRF 20, which is visually lossless). The new file
//    replaces the old one, keeping its name, only if it is at least 15% smaller.
// 2. Otherwise, if the file's index ("moov") sits at the end, moves it to the
//    front without re-encoding, so the browser can start playing before the
//    whole file has arrived.
// 3. Saves the first frame as <name>-poster.jpg next to the video. The demos
//    show it straight away while the video loads (ImageOrVideo.videoPoster).
//
// Options:
//   --out <folder>   write results there instead of replacing files in public/
//                    (for comparing before and after)
//   --force          re-encode files this script has already processed
//
// Processed files are recorded in scripts/.videos-done.json so that running it
// again does not re-encode (and slowly degrade) the same video.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const ROOT = path.join(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SOURCE = path.join(PUBLIC, "images");
const DONE_FILE = path.join(import.meta.dirname, ".videos-done.json");
const MIN_SAVING = 0.15;

const args = process.argv.slice(2);
const outIndex = args.indexOf("--out");
const outDir = outIndex >= 0 ? path.resolve(args[outIndex + 1]) : null;
const force = args.includes("--force");

// Videos scrubbed by scrolling need a keyframe on every frame, or seeking stutters.
const SCRUBBED = new Set(["luxury-real-estate/hero.mp4"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** True when the MP4's "moov" index comes after the media data. */
function moovAtEnd(file) {
  const fd = fs.openSync(file, "r");
  try {
    const size = fs.fstatSync(fd).size;
    const header = Buffer.alloc(16);
    let offset = 0;
    while (offset + 8 <= size) {
      fs.readSync(fd, header, 0, 16, offset);
      let boxSize = header.readUInt32BE(0);
      const type = header.toString("latin1", 4, 8);
      if (type === "moov") return false;
      if (type === "mdat") return true;
      if (boxSize === 1) boxSize = Number(header.readBigUInt64BE(8));
      if (boxSize === 0) return true;
      offset += boxSize;
    }
    return false;
  } finally {
    fs.closeSync(fd);
  }
}

function run(argv) {
  execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...argv], { stdio: "inherit" });
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const done = !force && fs.existsSync(DONE_FILE) ? JSON.parse(fs.readFileSync(DONE_FILE, "utf8")) : {};
const rows = [];

for (const file of walk(SOURCE).filter((f) => f.toLowerCase().endsWith(".mp4"))) {
  const rel = path.relative(SOURCE, file).split(path.sep).join("/");
  const target = outDir ? path.join(outDir, rel) : file;
  const poster = target.replace(/\.mp4$/i, "-poster.jpg");
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const before = fs.statSync(file).size;
  let action = "kept";

  if (done[rel] !== before) {
    const temp = `${target}.tmp.mp4`;
    run([
      "-i", file,
      "-map", "0:v:0", "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "20",
      "-pix_fmt", "yuv420p", "-profile:v", "high",
      "-fps_mode", "passthrough",
      ...(SCRUBBED.has(rel) ? ["-g", "1"] : []),
      "-movflags", "+faststart",
      temp,
    ]);
    const after = fs.statSync(temp).size;
    if (after <= before * (1 - MIN_SAVING)) {
      fs.renameSync(temp, target);
      action = "re-encoded";
    } else {
      fs.rmSync(temp);
      if (moovAtEnd(file)) {
        run(["-i", file, "-map", "0", "-c", "copy", "-movflags", "+faststart", `${target}.tmp.mp4`]);
        fs.renameSync(`${target}.tmp.mp4`, target);
        action = "index moved to front";
      } else if (outDir) {
        fs.copyFileSync(file, target);
      }
    }
    done[rel] = fs.statSync(target).size;
  } else if (outDir) {
    fs.copyFileSync(file, target);
  }

  // First frame, at most 1280px wide, as the poster.
  run(["-i", target, "-frames:v", "1", "-vf", "scale='min(1280,iw)':-2", "-q:v", "4", poster]);

  rows.push({ video: rel, before: mb(before), after: mb(fs.statSync(target).size), action });
}

if (!outDir) fs.writeFileSync(DONE_FILE, `${JSON.stringify(done, null, 2)}\n`);
console.table(rows);
