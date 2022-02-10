function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

function tokenHandler(req, res, next) {
  if (req.body.token !== process.env.TOKEN) {
    console.error("Bad Token!");
    res.sendStatus(401);
  }
  delete req.body.token;
  next();
}

module.exports = {
  notFound,
  errorHandler,
  tokenHandler,
};
