const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", controller.blocks.getLatestBlocks);
router.get("/:blockNumberOrHash", controller.blocks.getByNumberOrHash);

module.exports = router;
