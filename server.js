import http from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname } from 'node:path';

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = new URL('./public/', import.meta.url);

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function toFileUrl(pathname) {
  // Prevent directory traversal
  const clean = pathname.replace(/\.\.+/g, '');
  const file = clean === '/' ? 'index.html' : clean.replace(/^\//, '');
  return new URL(file, PUBLIC_DIR);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const fileUrl = toFileUrl(url.pathname);
  const ext = extname(fileUrl.pathname);

  let streamUrl = fileUrl;
  if (!existsSync(fileUrl)) {
    // fallback for directories like /about -> /about.html
    const htmlUrl = new URL(url.pathname.replace(/\/$/, '') + '.html', PUBLIC_DIR);
    if (existsSync(htmlUrl)) {
      streamUrl = htmlUrl;
    } else {
      const notFoundUrl = new URL('404.html', PUBLIC_DIR);
      if (existsSync(notFoundUrl)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        createReadStream(notFoundUrl).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      }
      return;
    }
  }

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  createReadStream(streamUrl).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

