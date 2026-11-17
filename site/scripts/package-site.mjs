// Builds the site and packs it for upload. Run with: npm run package
//
// Result, in the project's top folder (one level above site/):
//   upload/                    the finished website; its CONTENTS go into public_html
//   khariz-digital-upload.zip  the same files as one archive, for the host's File Manager
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const site = path.join(import.meta.dirname, "..");
const root = path.join(site, "..");
const out = path.join(site, "out");
const upload = path.join(root, "upload");
const zip = path.join(root, "khariz-digital-upload.zip");

// The public address is read from site/.env.production (NEXT_PUBLIC_SITE_URL).
const envFile = path.join(site, ".env.production");
const envText = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
const siteUrl = (envText.match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m)?.[1] ?? "").trim();

const run = (command, cwd = site) => execSync(command, { cwd, stdio: "inherit" });

run("node scripts/optimize-images.mjs");
run("npx next build");

fs.rmSync(upload, { recursive: true, force: true });
fs.cpSync(out, upload, { recursive: true });
fs.rmSync(zip, { force: true });
try {
  if (process.platform === "win32") {
    try {
      execSync(`tar -a -c -f "${zip}" *`, { cwd: upload, stdio: "inherit" });
    } catch {
      execSync(`powershell -NoProfile -Command "Compress-Archive -Path '*' -DestinationPath '${zip}' -Force"`, { cwd: upload, stdio: "inherit" });
    }
  } else {
    run(`zip -qr "${zip}" . -x "*.DS_Store"`, upload);
  }
} catch (err) {
  console.warn("Could not generate zip archive:", err.message);
}

function getPathSize(targetPath) {
  try {
    if (!fs.existsSync(targetPath)) return "0B";
    const stat = fs.statSync(targetPath);
    if (!stat.isDirectory()) {
      return formatBytes(stat.size);
    }
    let totalBytes = 0;
    function walkDir(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkDir(full);
        else totalBytes += fs.statSync(full).size;
      }
    }
    walkDir(targetPath);
    return formatBytes(totalBytes);
  } catch {
    return "unknown";
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}
if (siteUrl) {
  console.log(`\nBuilt for ${siteUrl}`);
} else {
  console.log(
    "\nNOTE: no site address is set, so the sitemap and sharing links use http://localhost:3000.\n" +
      "Before the real upload, create site/.env.production with a line like\n" +
      "  NEXT_PUBLIC_SITE_URL=https://your-domain.com\n" +
      "and run `npm run package` again.",
  );
}

console.log(`\nReady to upload:\n  ${upload}  (${getPathSize(upload)})\n  ${zip}  (${getPathSize(zip)})`);
