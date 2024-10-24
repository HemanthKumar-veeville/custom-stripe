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
