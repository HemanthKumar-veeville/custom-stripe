const payoutService = require("../services/payoutService");
const constants = require("../config/constants");

exports.createPayout = async (req, res, next) => {
  try {
    const payout = await payoutService.createPayout(req.body);
    res.status(201).json({
      message: constants.SUCCESS.PAYOUT_CREATED,
      data: payout,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTransfer = async (req, res, next) => {
  try {
    const { amount, currency, destination, onBehalfOf } = req.body;
    const transfer = await payoutService.createTransfer(
      amount,
      currency,
      destination,
      onBehalfOf
    );
    res.status(201).json({
      message: "Transfer created successfully",
      data: transfer,
    });
  } catch (error) {
    next(error);
  }
};

exports.createDirectPayout = async (req, res, next) => {
  try {
    const { amount, currency, connected_account_id } = req.body;
    const payout = await payoutService.createPayoutToBankAccount(
      amount,
      currency,
      connected_account_id
    );
    res.status(201).json({
      message: "Payout created successfully",
      data: payout,
    });
  } catch (error) {
    next(error);
  }
};
