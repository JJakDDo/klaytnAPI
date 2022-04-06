const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/:txHash", controller.txs.get);

module.exports = router;
