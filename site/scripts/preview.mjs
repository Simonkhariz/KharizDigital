// Serves the packaged site (../upload) the way Apache shared hosting does:
// folders open their index.html and unknown addresses show 404.html.
// Run with: npm run preview   (then open http://localhost:3000)
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.join(import.meta.dirname, "..", "..", "upload");
const port = Number(process.env.PORT ?? 3000);

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error("There is no packaged site yet. Run `npm run package` first.");
  process.exit(1);
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
};

http
  .createServer((request, response) => {
    const urlPath = decodeURIComponent(request.url.split("?")[0]);
    let file = path.join(root, urlPath);
    if (!file.startsWith(root)) {
      response.writeHead(403);
      return response.end();
    }

    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!urlPath.endsWith("/")) {
        response.writeHead(301, { Location: `${urlPath}/` });
        return response.end();
      }
      file = path.join(file, "index.html");
    }

    if (!fs.existsSync(file)) {
      response.writeHead(404, { "Content-Type": types[".html"] });
      return response.end(fs.readFileSync(path.join(root, "404.html")));
    }

    const { size } = fs.statSync(file);
    const type = types[path.extname(file)] ?? "application/octet-stream";

    // Video players ask for parts of a file.
    const range = request.headers.range;
    if (range) {
      const [from, to] = range.replace("bytes=", "").split("-");
      const start = Number(from);
      const end = to ? Number(to) : size - 1;
      response.writeHead(206, {
        "Content-Type": type,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
      });
      return fs.createReadStream(file, { start, end }).pipe(response);
    }

    response.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes" });
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, () => console.log(`Packaged site running at http://localhost:${port}`));
