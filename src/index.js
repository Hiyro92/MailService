const app = require("./app");

const http = require("http");
const http_port = process.env.HTTP_PORT || 5000;

http
  .createServer(app)
  .listen(http_port, () =>
    console.log(`HTTP-Server listening on Port: ${http_port}`)
  );
