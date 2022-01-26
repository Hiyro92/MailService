const express = require("express");

const emojis = require("./emojis");
const customerOrder = require("./customerOrder");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/customer", customerOrder);

module.exports = router;
