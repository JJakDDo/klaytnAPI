const express = require("express");
const router = express.Router();
const blocksRouter = require("./blocks");
const txsRouter = require("./txs");
const accountsRouter = require("./accounts");

router.use("/blocks", blocksRouter);
router.use("/txs", txsRouter);
router.use("/accounts", accountsRouter);

module.exports = router;
