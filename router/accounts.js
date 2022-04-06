const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/:accountAddress", controller.accounts.get);

module.exports = router;
