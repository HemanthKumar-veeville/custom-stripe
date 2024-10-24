const express = require("express");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.post("/create-account", accountController.createAccount);
router.get("/account/:id", accountController.getAccount);
router.post("/account/:id/onboarding", accountController.createOnboardingLink);

module.exports = router;
