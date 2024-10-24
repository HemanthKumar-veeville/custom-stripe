module.exports = {
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  ERRORS: {
    ACCOUNT_CREATION_FAILED: "Failed to create Stripe account",
    ONBOARDING_LINK_FAILED: "Failed to create onboarding link",
    ACCOUNT_RETRIEVAL_FAILED: "Failed to retrieve Stripe account",
    PAYOUT_CREATION_FAILED: "Failed to create payout",
    INVALID_DATA: "Invalid input data",
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
  SUCCESS: {
    ACCOUNT_CREATED: "Stripe account created successfully",
    ONBOARDING_LINK_CREATED: "Onboarding link created successfully",
    ACCOUNT_RETRIEVED: "Stripe account retrieved successfully",
    PAYOUT_CREATED: "Payout created successfully",
  },
};
