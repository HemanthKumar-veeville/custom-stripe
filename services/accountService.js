const stripe = require("../config/stripe");
const constants = require("../config/constants");

exports.createCustomAccount = async (accountData) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "FR", // Specific to French users
      email: accountData.email,
      business_type: "individual", // Or 'company' if applicable
      individual: {
        first_name: accountData.first_name,
        last_name: accountData.last_name,
        dob: {
          day: accountData.dob.day,
          month: accountData.dob.month,
          year: accountData.dob.year,
        },
        address: {
          line1: accountData.address.line1,
          city: accountData.address.city,
          postal_code: accountData.address.postal_code,
          country: "FR", // Specific to French accounts
        },
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  } catch (error) {
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
