const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.createPayout = async (payoutData) => {
  try {
    console.log({ payoutData });
    const payout = await stripe.payouts.create(
      {
        amount: payoutData.amount, // Amount in cents, should be <= artisan’s account balance
        currency: payoutData.currency, // Must match the artisan's bank currency
      },
      {
        stripeAccount: payoutData.source, // Artisan's connected Stripe account ID
      }
    );
    return payout;
  } catch (error) {
    console.log("Stripe Payout Error:", error);
    const detailedError = error.raw || error;
    throw new Error(
      `Stripe Payout Error: ${detailedError.message || "Unknown error"}`
    );
  }
};

exports.createTransfer = async (
  amount,
  currency,
  destination,
  onBehalfOf = null
) => {
  try {
    const transferOptions = {
      amount, // Amount in the smallest currency unit (e.g., cents for EUR)
      currency,
      destination, // Connected account ID (acct_XXX)
    };

    // Add on_behalf_of if provided
    if (onBehalfOf) {
      transferOptions.on_behalf_of = onBehalfOf;
    }

    const transfer = await stripe.transfers.create(transferOptions);
    return transfer;
  } catch (error) {
    console.log("Stripe Transfer Error:", error);
    const detailedError = error.raw || error;
    throw new Error(
      `Stripe Transfer Error: ${detailedError.message || "Unknown error"}`
    );
  }
};

exports.createPayoutToBankAccount = async (
  amount,
  currency,
  connected_account_id
) => {
  try {
    const payout = await stripe.payouts.create(
      {
        amount, // Amount in smallest currency unit (e.g., cents for EUR)
        currency, // Currency code (e.g., 'eur')
      },
      {
        stripeAccount: connected_account_id, // Manufacturer's connected account ID
      }
    );
    return payout;
  } catch (error) {
    console.log("Stripe Payout to Bank Account Error:", error);
    const detailedError = error.raw || error;
    throw new Error(
      `Stripe Payout to Bank Account Error: ${
        detailedError.message || "Unknown error"
      }`
    );
  }
};
