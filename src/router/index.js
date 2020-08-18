const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.statusCode = err.statusCode;
  res.json(err.message);
});

module.exports = router;
