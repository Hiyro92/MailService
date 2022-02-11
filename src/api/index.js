const express = require("express");

const customerOrder = require("./customerOrder");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/customer", customerOrder);

module.exports = router;
