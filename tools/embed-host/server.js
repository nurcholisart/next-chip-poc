const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:4000');
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const html = fs.readFileSync(filePath);
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(html);
});

server.listen(4000, '127.0.0.1', () => {
  console.log('Embed host running at http://127.0.0.1:4000');
});
