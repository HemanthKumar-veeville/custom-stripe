const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.createPayout = async (payoutData) => {
  try {
    const payout = await stripe.payouts.create({
      amount: payoutData.amount,
      currency: payoutData.currency,
      destination: payoutData.destination, // Payout to bank account
      method: "standard", // Payout method (standard or instant)
      source_type: "bank_account", // Optional, but you can specify 'bank_account'
    });
    return payout;
  } catch (error) {
    console.log({ error });
    throw new Error(constants.ERRORS.PAYOUT_CREATION_FAILED);
  }
};

exports.createTransfer = async (amount, currency, destination) => {
  try {
    const transfer = await stripe.transfers.create({
      amount, // Amount in the smallest currency unit (e.g., cents for EUR)
      currency,
      destination, // Connected account ID (acct_XXX)
    });
    return transfer;
  } catch (error) {
    console.log({ error });
    throw new Error(constants.ERRORS.PAYOUT_CREATION_FAILED);
  }
};
