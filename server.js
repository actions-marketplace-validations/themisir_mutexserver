const { createServer } = require("http");
const { clearInterval } = require("timers");
const { PORT, TTL } = process.env;
const port = parseInt(PORT) || 8080;
const ttl = (parseInt(TTL) || 180) * 1000;
const locks = {};

createServer(function (req, res) {
  const match = /^\/?([a-zA-Z0-9_.-]{3,16})\/?$/g.exec(req.url);
  const key = match && match[1];

  if (!key) {
    res.statusCode = 400;
    res.end();
    return;
  }

  if (req.method === "POST") {
    const interval = setInterval(function () {
      if (!locks[key] || locks[key] < Date.now()) {
        locks[key] = Date.now() + ttl;

        clearInterval(interval);
        res.statusCode = 200;
        res.end();
      }
    }, 500);

    res.on("close", function () {
      clearInterval(interval);
    });
  } else if (req.method === "DELETE") {
    delete locks[key];
    res.statusCode = 200;
    res.end();
  } else {
    res.statusCode = 405;
    res.end();
  }
}).listen(port);

console.log(`Listening on http://*:${port}/`);
