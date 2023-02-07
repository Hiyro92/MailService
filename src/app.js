const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

const morganFormat =
  process.env.NODE_ENV === "production"
    ? (tokens, req, res) => {
        const format = [
          `[${tokens.date(req, res, "iso")}]`,
          `${req.headers["x-real-ip"]}`,
          `${tokens.method(req, res)}`,
          `"${tokens.url(req, res)}"`,
          `${tokens.status(req, res)} -`,
          `${tokens.res(req, res, "content-length")} byte`,
          `${tokens["response-time"](req, res)} ms`,
        ].join(" ");
        return format;
      }
    : "tiny";

app.use(
  morgan(morganFormat, {
    skip: function (req, res) {
      return req.originalUrl === "/api/v1/online";
    },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/v1/online", (req, res) => {
  res.json({
    message: "👍ok👍",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🐟🐟🐠🐟🐟",
  });
});

app.use("/api/v1", middlewares.tokenHandler, api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
