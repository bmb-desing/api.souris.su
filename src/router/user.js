const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.get("/:hash", userController.getOne);

module.exports = router;
