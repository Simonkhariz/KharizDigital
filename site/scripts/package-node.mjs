// Packages Khariz Digital as a standalone Node.js application for cPanel "Setup Node.js App".
// Run with: npm run package:node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const siteDir = path.join(import.meta.dirname, "..");
const projectRoot = path.join(siteDir, "..");
const uploadNode = path.join(projectRoot, "upload-node");
const zipPath = path.join(projectRoot, "khariz-digital-node.zip");

function run(cmd, cwd = siteDir, env = {}) {
  execSync(cmd, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, NEXT_OUTPUT_MODE: "standalone", ...env },
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getDirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirSize(full);
    } else {
      total += fs.statSync(full).size;
    }
  }
  return total;
}

console.log("1. Optimizing images...");
run("node scripts/optimize-images.mjs");

console.log("2. Building Next.js in standalone mode...");
// Start from a clean build: Next.js can reuse stale CSS from its cache in .next.
fs.rmSync(path.join(siteDir, ".next"), { recursive: true, force: true });
const nextBin = path.join(siteDir, "node_modules", "next", "dist", "bin", "next");
const buildCommand = fs.existsSync(nextBin)
  ? `node "${nextBin}" build`
  : process.platform === "win32" ? "npx.cmd next build" : "npx next build";
// A clean build downloads the Google fonts again; one slow download fails the
// build, so try once more before giving up.
try {
  run(buildCommand);
} catch {
  console.warn("Build failed (often a font download timing out). Trying once more...");
  run(buildCommand);
}

console.log("3. Assembling standalone production bundle in upload-node/...");
if (fs.existsSync(uploadNode)) {
  fs.rmSync(uploadNode, { recursive: true, force: true });
}
fs.mkdirSync(uploadNode, { recursive: true });

const standaloneBase = path.join(siteDir, ".next", "standalone");
// Next.js may nest under standalone/site or place directly under standalone/
let standaloneSrc = standaloneBase;
if (fs.existsSync(path.join(standaloneBase, "site", "server.js"))) {
  standaloneSrc = path.join(standaloneBase, "site");
} else if (fs.existsSync(path.join(standaloneBase, "kharizDigital", "site", "server.js"))) {
  standaloneSrc = path.join(standaloneBase, "kharizDigital", "site");
} else if (!fs.existsSync(path.join(standaloneBase, "server.js"))) {
  // Search for server.js inside standaloneBase
  const findServer = (dir) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isDirectory()) {
        const sub = path.join(dir, f.name);
        if (fs.existsSync(path.join(sub, "server.js"))) return sub;
      }
    }
    return dir;
  };
  standaloneSrc = findServer(standaloneBase);
}

console.log("   Standalone source:", standaloneSrc);
fs.cpSync(standaloneSrc, uploadNode, { recursive: true });

// Copy public/ to upload-node/public/
const publicSrc = path.join(siteDir, "public");
const publicDest = path.join(uploadNode, "public");
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// Copy .next/static/ to upload-node/.next/static/
const staticSrc = path.join(siteDir, ".next", "static");
const staticDest = path.join(uploadNode, ".next", "static");
if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.dirname(staticDest), { recursive: true });
  fs.cpSync(staticSrc, staticDest, { recursive: true });
}

// Ensure server.js exists at upload-node root
if (!fs.existsSync(path.join(uploadNode, "server.js"))) {
  console.error("Error: server.js not found at upload-node root!");
  process.exit(1);
}

// If standaloneBase had a separate node_modules that didn't get copied
if (fs.existsSync(path.join(standaloneBase, "node_modules")) && !fs.existsSync(path.join(uploadNode, "node_modules"))) {
  fs.cpSync(path.join(standaloneBase, "node_modules"), path.join(uploadNode, "node_modules"), { recursive: true });
}

console.log("4. Compressing upload-node into khariz-digital-node.zip...");
if (fs.existsSync(zipPath)) {
  fs.rmSync(zipPath, { force: true });
}

if (process.platform === "win32") {
  const ps = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${uploadNode}', '${zipPath}', [System.IO.Compression.CompressionLevel]::Optimal, $false);`;
  execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "inherit" });
} else {
  execSync(`zip -qr "${zipPath}" .`, { cwd: uploadNode, stdio: "inherit" });
}

const zipSize = fs.statSync(zipPath).size;
const uploadSize = getDirSize(uploadNode);

console.log("\nNode.js Standalone Package Ready!");
console.log(`  Folder:  ${uploadNode}  (${formatBytes(uploadSize)})`);
console.log(`  Archive: ${zipPath}  (${formatBytes(zipSize)})`);
