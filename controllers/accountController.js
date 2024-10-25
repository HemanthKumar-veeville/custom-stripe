const accountService = require("../services/accountService");
const constants = require("../config/constants");

exports.createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createCustomAccount(req.body);
    res.status(201).json({
      message: constants.SUCCESS.ACCOUNT_CREATED,
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAccount = async (req, res, next) => {
  try {
    const account = await accountService.getAccountById(req.params.id);
    res.status(200).json({
      message: constants.SUCCESS.ACCOUNT_RETRIEVED,
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOnboardingLink = async (req, res, next) => {
  try {
    const onboardingLink = await accountService.createOnboardingLink(
      req.params.id
    );
    res.status(200).json({
      message: constants.SUCCESS.ONBOARDING_LINK_CREATED,
      data: onboardingLink.url,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBankAccounts = async (req, res, next) => {
  try {
    const { id } = req.params; // The connected account ID from the request path
    const bankAccounts = await accountService.getBankAccountsByAccountId(id);
    res.status(200).json({
      message: "Bank accounts retrieved successfully",
      data: bankAccounts,
    });
  } catch (error) {
    next(error);
  }
};
