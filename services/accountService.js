const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.createCustomAccount = async (accountData) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "FR", // Specific to French users
      email: accountData.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      settings: {
        payouts: {
          schedule: {
            interval: "manual", // Requires manual payout trigger
          },
        },
      },
    });
    return account;
  } catch (error) {
    console.log({ error });
    throw new Error(constants.ERRORS.ACCOUNT_CREATION_FAILED);
  }
};

exports.getAccountById = async (accountId) => {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    return account;
  } catch (error) {
    throw new Error(constants.ERRORS.ACCOUNT_RETRIEVAL_FAILED);
  }
};

exports.createOnboardingLink = async (accountId) => {
  try {
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: "https://yourapp.com/reauth",
      return_url: "https://yourapp.com/dashboard",
      type: "account_onboarding",
    });
    return link;
  } catch (error) {
    throw new Error(constants.ERRORS.ONBOARDING_LINK_FAILED);
  }
};

exports.getBankAccountsByAccountId = async (accountId) => {
  try {
    const bankAccounts = await stripe.accounts.listExternalAccounts(accountId, {
      object: "bank_account", // Retrieve only bank accounts (exclude cards)
    });

    return bankAccounts.data; // Return the list of bank accounts
  } catch (error) {
    throw new Error(constants.ERRORS.ACCOUNT_RETRIEVAL_FAILED);
  }
};
