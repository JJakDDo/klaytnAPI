const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/:blockNumber", controller.blocks.get);

module.exports = router;
