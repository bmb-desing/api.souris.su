const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();
const passport = require("../middleware/passport");

router.get("/csrf", function (req, res, next) {
  return res.json({ csrfToken: req.csrfToken() });
});
router.post("/login", authController.login);
router.put("/update", authController.updateToken);

module.exports = router;
