const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

const morganFormat = (tokens, req, res) => {
  return [
    tokens.timestamp(),
    "-",
    req.headers["X-Real-IP"],
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
};

const morganJSONFormat = () =>
  JSON.stringify({
    method: ":method",
    url: ":url",
    http_version: ":http-version",
    remote_addr: ":remote-addr",
    remote_addr_forwarded: ":req[x-forwarded-for]", //Get a specific header
    response_time: ":response-time",
    status: ":status",
    content_length: ":res[content-length]",
    timestamp: ":date[iso]",
    user_agent: ":user-agent",
  });

app.use(
  morgan(morganFormat(), {
    skip: function (req, res) {
      return req.url === "/api/v1/online";
    },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🐟🐟🐠🐟🐟",
  });
});

app.use("/api/v1", middlewares.tokenHandler, api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
