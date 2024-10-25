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
    const { amount, currency, destination } = req.body;
    const transfer = await payoutService.createTransfer(
      amount,
      currency,
      destination
    );
    res.status(201).json({
      message: "Transfer created successfully",
      data: transfer,
    });
  } catch (error) {
    next(error);
  }
};
