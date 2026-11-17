// Prepares images for a fast static site. Run with: npm run images
//
// 1. Agency images. Originals (JPG/PNG) live in media/, outside the published
//    site: media/projects/<slug>/, media/founder/, media/logos/. For each one
//    this writes WebP copies at several widths into the matching folder under
//    public/, named <name>-640.webp, <name>-1280.webp, <name>-1920.webp. The
//    <Picture> component lets the browser pick the smallest one that fits.
// 2. Demo media (public/images, public/showcase): shrinks any image wider
//    than 1920px or heavier than it needs to be, in place, keeping its name
//    and format so no code has to change.
//
// It is safe to run again: copies that are up to date are left alone.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const MEDIA = path.join(ROOT, "media");
const WIDTHS = [640, 1280, 1920];
const MAX_WIDTH = 1920;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

async function makeResponsiveCopies(folder) {
  let made = 0;
  for (const file of walk(path.join(MEDIA, folder))) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const { width } = await sharp(file).metadata();
    const base = path.join(PUBLIC, path.relative(MEDIA, file)).replace(/\.(jpe?g|png)$/i, "");
    fs.mkdirSync(path.dirname(base), { recursive: true });
    for (const target of WIDTHS) {
      // Never enlarge: the widest copy is the original width.
      const w = Math.min(target, width);
      const out = `${base}-${target}.webp`;
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue;
      await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(out);
      made++;
    }
  }
  console.log(`${folder}: wrote ${made} WebP copies`);
}

async function shrinkInPlace(folder) {
  let before = 0;
  let after = 0;
  let changed = 0;
  for (const file of walk(path.join(PUBLIC, folder))) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) continue;
    const size = fs.statSync(file).size;
    before += size;
    const image = sharp(file, { animated: false });
    const meta = await image.metadata();
    const tooWide = meta.width > MAX_WIDTH;
    if (!tooWide && size < 250_000) {
      after += size;
      continue;
    }
    let pipeline = image.resize({ width: Math.min(meta.width, MAX_WIDTH) });
    if (ext === ".webp") pipeline = pipeline.webp({ quality: 76 });
    else if (ext === ".avif") pipeline = pipeline.avif({ quality: 52 });
    else if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9, palette: !meta.hasAlpha });
    else pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
    const buffer = await pipeline.toBuffer();
    if (buffer.length < size * 0.9) {
      fs.writeFileSync(file, buffer);
      after += buffer.length;
      changed++;
    } else {
      after += size;
    }
  }
  const mb = (n) => (n / 1e6).toFixed(1);
  console.log(`${folder}: ${changed} images shrunk, ${mb(before)} MB -> ${mb(after)} MB`);
}

await makeResponsiveCopies("projects");
await makeResponsiveCopies("founder");
await makeResponsiveCopies("logos");
await shrinkInPlace("images");
await shrinkInPlace("showcase");
