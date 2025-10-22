const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 8080; // AWS EB ke liye default port
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log("🚀 Frontend running on port " + port);
  });
});
