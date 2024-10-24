const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.createPayout = async (payoutData) => {
  try {
    const payout = await stripe.payouts.create({
      amount: payoutData.amount,
      currency: payoutData.currency,
      destination: payoutData.destination, // Payout to bank account
    });
    return payout;
  } catch (error) {
    throw new Error(constants.ERRORS.PAYOUT_CREATION_FAILED);
  }
};
