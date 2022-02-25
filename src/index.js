const app = require("./app");

const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const http_port = process.env.HTTP_PORT || 5000;
const https_port = process.env.HTTPS_PORT || 5001;

http
  .createServer(app)
  .listen(http_port, () =>
    console.log(`HTTP-Server listening on Port: ${http_port}`)
  );
/* https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "/keys/server.key")),
      cert: fs.readFileSync(path.join(__dirname, "/keys/server.cert")),
    },
    app
  )
  .listen(https_port, () =>
    console.log(`HTTPS-Server listening on Port: ${https_port}`)
  );
 */
