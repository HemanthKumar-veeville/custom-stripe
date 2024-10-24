const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      constants.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "account.updated") {
      const account = event.data.object;
      // Handle account updates (e.g., verification status changes)
      if (account.verification.disabled_reason) {
        // Handle verification failures
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
