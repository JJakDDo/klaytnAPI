const express = require("express");
const router = express.Router();
const blocksRouter = require("./blocks");
const txsRouter = require("./txs");

router.use("/blocks", blocksRouter);
router.use("/txs", txsRouter);

module.exports = router;
