const express = require("express");
const payoutController = require("../controllers/payoutController");

const router = express.Router();

router.post("/create-payout", payoutController.createPayout);

module.exports = router;
