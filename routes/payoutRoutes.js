const express = require("express");
const payoutController = require("../controllers/payoutController");

const router = express.Router();

router.post("/create-payout", payoutController.createPayout);
router.post("/create-transfer", payoutController.createTransfer);

module.exports = router;
