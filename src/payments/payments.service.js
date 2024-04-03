import knex from "../common/config/database.config";
import StoreItemService from "../store-items/store-items.service";
import StoreService from "../stores/store.service";
import Helper from "../common/helper/helper";
import Stripe from "stripe";
import fs from "fs";
import axios from "axios";
import FileHelper from "../common/helper/file.helper";
import BadRequestException from "../common/exception/bad-request.exception";
import UserService from "../users/user.service";
import constantsConfig from "../common/config/constants.config";
require("dotenv").config();
const StripeKey = process.env.STRIPE_KEY;
const stripe = Stripe(StripeKey);
class PaymentService {
  static calculateCartPaymentDetails(data) {
    let total = 0;
    data.map((items) => {
      const perItemTotal = items.quantity * items.price;
      total += perItemTotal;
    });

    let itemTotal = Helper.limitDecimalDigit(total);
    let taxes = Helper.taxValue(itemTotal);
    let grandTotal = Helper.limitDecimalDigit(itemTotal + taxes);

    return { itemTotal, taxes, grandTotal };
  }

  /**
   * Create Stripe Customer
   * @param {*} email
   * @param {*} phone
   * @returns
   */
  static async createCustomer(email, phone, userId) {
    try {
      const user = await UserService.findCustomerById(userId);

      const customer = await stripe.customers.create({
        email: user.email,
        phone: user.phone,
      });

      // const setupIntent = await stripe.setupIntents.create({
      //   customer: customer.id,
      //   payment_method_types: ["bancontact", "card", "ideal"],
      // });

      return customer;
    } catch (error) {
      return error.raw.message;
    }
  }

  /**
   * Add New Customer Card Details
   * @param {*} cardData
   * @returns
   */
  static async addNewCard(cardData, userId) {
    try {
      const user = await UserService.findCustomerById(userId);
      const checkCustomerPaymentAccountExist =
        await this.checkCustomerPaymentAccountExist(userId);

      let customerId;
      if (!checkCustomerPaymentAccountExist) {
        const customer = await stripe.customers.create({
          email: user.email,
          phone: user.phone,
        });

        // Add Customer Payment Details
        await this.addCustomerPaymentDetails(userId, customer.id);
        customerId = customer.id;
      } else {
        customerId = checkCustomerPaymentAccountExist.accountId;
      }

      const cardToken = await stripe.tokens.create({
        card: {
          name: cardData.card_holder_name,
          number: cardData.cardNumber,
          exp_month: cardData.cardExpMonth,
          exp_year: cardData.cardExpYear,
          cvc: cardData.cvc,
        },
      });

      const card = await stripe.customers.createSource(customerId, {
        source: cardToken.id,
      });

      if (cardData.isDefault === true) {
        await stripe.customers.update(customerId, {
          default_source: card.id,
        });
      }
      await this.addCustomerCardDetails(userId, cardToken.id, card.id); //Add Customer Card Details

      return cardToken;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get All Saved Card Details By Customer ID
   * @param {*} customerId
   */
  static async getAllSavedCards(customerId) {
    const checkCustomerPaymentAccountExist =
      await this.checkCustomerPaymentAccountExist(customerId);

    if (!checkCustomerPaymentAccountExist) {
      throw new BadRequestException("Your payment method not found.");
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: checkCustomerPaymentAccountExist.accountId,
      type: "card",
    });

    const customer = await stripe.customers.retrieve(
      checkCustomerPaymentAccountExist.accountId
    );

    const allCard = paymentMethods.data.map((value) => ({
      cardId: value.id,
      cardHolderName: value.billing_details.name,
      cardBrand: value.card.brand,
      cardLogoUrl: constantsConfig.baseUrl(
        `cards/${value.card.brand.toLowerCase()}.png`
      ),
      cardExpMonth: value.card.exp_month,
      cardExpYear: value.card.exp_year,
      cardLast4Digit: value.card.last4,
      defaultMethod: value.id === customer.default_source ? true : false,
    }));

    return allCard;
  }

  /**
   * Update Card By Card ID
   * @param {*} userId
   * @param {*} cardId
   * @returns
   */
  static async updateCardById(userId, cardId, updateData) {
    try {
      const checkCardExist = await this.checkCardExist(userId, cardId);
      if (!checkCardExist) {
        throw new BadRequestException("Card Does Not Exist");
      } else {
        const userAccount = await this.checkCustomerPaymentAccountExist(userId);
        let stripeCardDataForUpdate = {};

        updateData.card_holder_name
          ? (stripeCardDataForUpdate.name = updateData.card_holder_name)
          : null;
        updateData.cardExpMonth
          ? (stripeCardDataForUpdate.exp_month = updateData.cardExpMonth)
          : null;
        updateData.cardExpYear
          ? (stripeCardDataForUpdate.exp_year = updateData.cardExpYear)
          : null;

        const updateCard = await stripe.customers.updateSource(
          userAccount.accountId,
          cardId,
          stripeCardDataForUpdate
        );
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * Delete Card By Card ID
   * @param {*} userId
   * @param {*} cardId
   * @returns
   */
  static async deleteCardById(userId, cardId) {
    const checkCardExist = await this.checkCardExist(userId, cardId);
    if (!checkCardExist) {
      throw new BadRequestException("Card Does Not Exist");
    } else {
      const userAccount = await this.checkCustomerPaymentAccountExist(userId);
      const deleteCard = await stripe.customers.deleteSource(
        userAccount.accountId,
        cardId
      );

      //do soft delete
      return await knex("customer_card_details")
        .update("deletedAt", new Date())
        .where("customerId", userId)
        .where("cardId", cardId);
    }
  }

  /**
   * Create Store Payment Receieve Account
   * @param {*} bankData
   * @param {*} bankDocument
   * @param {*} storeId
   * @returns
   */
  static async createSellerAccount(bankData, bankDocument, storeId) {
    const checkStorePaymentDetailsExist =
      await this.checkStorePaymentDetailsExist(storeId);
    if (checkStorePaymentDetailsExist) {
      const account = await this.checkStorePaymentDetailsVerifiedOrNot(storeId);
      return account;
    } else {
      const file = await FileHelper.uploadFile(
        "bankdocument",
        bankDocument.data,
        bankDocument.mimetype
      );

      //upload bank document in stripe
      const bankFront = await stripe.files.create({
        purpose: "account_requirement",
        file: {
          data: fs.readFileSync("public/" + file),
          name: "front.jpg",
          type: "application/octet-stream",
        },
      });

      //create bank token for stripe connect account
      const bankToken = await stripe.tokens.create({
        bank_account: {
          country: "us",
          currency: "USD",
          account_number: bankData.account_number,
          routing_number: bankData.routing_number,
          // account_holder_type: "company",
          account_holder_name: bankData.account_holder_name,
        },
      });

      //create stripe connect account
      const account = await stripe.accounts.create({
        type: "custom",
        country: "US",
        // business_type: "company",
        external_account: bankToken.id,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        documents: {
          bank_account_ownership_verification: {
            files: [bankFront.id],
          },
        },
      });

      await this.addStorePaymentReceivingDetails(storeId, account.id); // Add Store Payment Receiving Details

      //generate stripe account link so user fill pending details in that
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "https://example.com",
        return_url: "https://example.com",
        type: "account_onboarding",
      });
      return { url: accountLink.url };
    }
  }

  /**
   * Get Store Payment Bank Account Information
   * @param {*} storeId
   * @returns
   */
  static async storePaymentBankAccountInfo(storeId) {
    const accountData = await this.checkStorePaymentDetailsExist(storeId);
    if (!accountData) {
      throw new BadRequestException("First Add Payment Method");
    }

    const getAccount = await stripe.accounts.retrieve(accountData.accountId);

    let status = true;
    if (getAccount.payouts_enabled !== true) {
      status = false;
    }

    const storePaymentAccountData = {
      bankName: getAccount.external_accounts.data[0].bank_name,
      bankAccountHolderName:
        getAccount.external_accounts.data[0].account_holder_name,
      bankAccountNumberLast4: getAccount.external_accounts.data[0].last4,
      bankAccountRoutingNumber:
        getAccount.external_accounts.data[0].routing_number,
      bankAccountVerificationStatus: status,
    };

    return storePaymentAccountData;
  }

  /**
   * Create Charges
   * @param {*} amount
   * @param {*} cardId
   * @param {*} customerId
   * @returns
   */
  static async createCharges(orderId, cardId, orderData) {
    try {
      const storeAccount = await this.checkStorePaymentDetailsExist(
        orderData.storeId
      );
      if (!storeAccount)
        throw new BadRequestException(
          "Store Payment Receive Account Doesn't exist"
        );

      const customerAccount = await this.checkCustomerPaymentAccountExist(
        orderData.customerId
      );
      if (!customerAccount)
        throw new BadRequestException(
          "Please Add Your Card Details For Payment"
        );

      const checkCardExist = await this.checkCardExist(
        orderData.customerId,
        cardId
      );

      if (!checkCardExist) {
        throw new BadRequestException("Card Does Not Exist");
      } else {
        const paymentMethod = await stripe.paymentMethods.create(
          {
            customer: customerAccount.accountId,
            payment_method: cardId,
          },
          {
            stripeAccount: storeAccount.accountId,
          }
        );

        // const setupIntent = await stripe.setupIntents.create({
        //   customer: customerAccount.accountId,
        //   payment_method: cardId,
        //   confirm: true,
        // });

        // const setupIntents = await stripe.setupIntents.list({
        //   customer: customerAccount.accountId,
        // });
        const amount = orderData.grandTotal * 100;

        const paymentIntent = await stripe.paymentIntents
          .create(
            {
              amount: Math.floor(amount.toFixed(2)),
              currency: "usd",
              payment_method: paymentMethod.id,
              // confirm: true,
              metadata: {
                order_id: orderId,
                amount: orderData.grandTotal,
                customerId: orderData.customerId,
                storeId: orderData.storeId,
              },
            },
            {
              stripeAccount: storeAccount.accountId,
            }
          )
          .catch((e) => {
            console.log(e);
            // console.log(e.payment_intent.last_payment_error.type);
            return {
              id: e.raw.payment_intent.id,
              // status: e.raw.payment_intent.status,
              status: e.payment_intent.last_payment_error.type,
            };
          });

        const getPaymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntent.id,
          {
            stripeAccount: storeAccount.accountId,
          }
        );

        // console.log(getPaymentIntent, "retreive +++++++++++++++++");

        await knex("order_payment_details").insert({
          orderId,
          storeId: orderData.storeId,
          customerId: orderData.customerId,
          cardId,
          paymentMethodId: paymentMethod.id,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        });
        // console.log(getPaymentIntent.status);
        return getPaymentIntent.status;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    //```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

    // const paymentIntent2 = await stripe.paymentIntents.confirm(
    //   "pi_3LFCmq2SCaQd7EIe1q26TbFi",
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );
    // const refund = await stripe.refunds.create(
    //   {
    //     payment_intent: "pi_3LFAoF2SCaQd7EIe1JKopzLF",
    //   },
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );

    // const paymentMethod = await stripe.paymentMethods.create(
    //   {
    //     customer: customerId,
    //     payment_method: cardId,
    //   },
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );

    // const paymentIntent = await stripe.paymentIntents.create(
    //   {
    //     amount: amount,
    //     currency: "usd",
    //     payment_method: paymentMethod.id,
    //     confirm: true,
    //   },
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );

    // const paymentIntent2 = await stripe.paymentIntents.confirm(
    //   "pi_3LFCmq2SCaQd7EIe1q26TbFi",
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );

    // const paymentIntent1 = await stripe.paymentIntents.retrieve(
    //   paymentIntent.id,
    //   {
    //     stripeAccount: storeAccount.accountId,
    //   }
    // );

    // return paymentIntent1;

    // const charge = await stripe.charges.create({
    //   amount: amount,
    //   currency: "usd",
    //   source: cardId,
    //   customer: customerId,
    //   transfer_group: "{ORDER10}",
    //   transfer_data: {
    //     amount: Math.round(amount - (amount * 10) / 100),
    //     destination: storeAccount.accountId,
    //   },
    //   description:
    //     "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
    // });
    // Create a Charge:
    // const charge = await stripe.charges.create({
    //   amount: 1000,
    //   currency: "usd",
    //   source: cardId,
    // customer: customerId,
    //   transfer_group: "{ORDER10}",
    // });

    // // Create a Transfer to the connected account (later):
    // const transfer = await stripe.transfers.create({
    //   amount: 7000,
    //   currency: "usd",
    //   destination: storeAccount.accountId,
    //   transfer_group: "{ORDER10}",
    // });

    // const transfer= await stripe.transfers.create({
    //   amount: "1000",
    //   currency: "usd",
    //   destination: storeAccount.accountId,
    //   transfer_group: createCharge.transfer_group,
    // });

    // console.log(charge, "++++++++++++++++++++");
    // console.log(transfer, "---------------------");

    // Create a second Transfer to another connected account (later):
    // const secondTransfer = await stripe.transfers.create({
    //   amount: 2000,
    //   currency: "usd",
    //   destination: "acct_1LAvZR2QnfLjhPFx",
    //   transfer_group: createCharge.transfer_group,
    // });

    // const transfer = await stripe.transfers.create({
    //   amount: 2000,
    //   currency: "usd",
    //   source_transaction: createCharge.id,
    //   destination: "acct_1LASte2QZhYW8hYf",
    //   destination: "acct_1LARM22RYcPTBFM8",
    // });

    // const createCharge1 = await stripe.charges.create({
    //   amount: 5000,
    //   currency: "usd",
    //   source: "card_1LAWdwCwocdu61MQC4Q4DI01",
    //   customer: "cus_LsGvX9nSqjda36",
    //   transfer_data: {
    //     amount: 400,
    //     destination: "acct_1LARM22RYcPTBFM8",
    //   },
    // });

    // const transfer1 = await stripe.transfers.create({
    //   amount: 1000,
    //   currency: "usd",
    //   source_transaction: createCharge1.id,
    //   destination: "acct_1LARM22RYcPTBFM8",
    // });

    // const paymentIntent = await stripe.paymentIntents.create(
    //   {
    //     amount: 1000,
    //     currency: "usd",
    //     payment_method_types: ["card"],
    //   },
    //   {
    //     stripeAccount: "acct_1LASte2QZhYW8hYf",
    //   }
    // );

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: "usd",
    //   on_behalf_of: "acct_1LASte2QZhYW8hYf",
    // });

    // const transfer = await stripe.transfers.create({
    //   amount: 1000,
    //   currency: "usd",
    //   source_transaction: paymentIntent.id,
    //   destination: "acct_1LASte2QZhYW8hYf",
    // });
    // return payment
    return;
  }

  /**
   * Update Pending Or Unsuccessful Order Payment
   * @param {*} orderId
   * @param {*} cardId
   */
  static async updatePendingOrderPayment(orderId, cardId) {
    try {
      const getOrderPaymentDetails = await this.getOrderPaymentDetails(orderId);
      if (!getOrderPaymentDetails) {
        throw new BadRequestException("Order Payment Details Is Not Exist");
      }

      const storeAccount = await this.checkStorePaymentDetailsExist(
        getOrderPaymentDetails.storeId
      );
      if (!storeAccount)
        throw new BadRequestException(
          "Store Payment Receive Account Doesn't exist"
        );

      const customerAccount = await this.checkCustomerPaymentAccountExist(
        getOrderPaymentDetails.customerId
      );
      if (!customerAccount)
        throw new BadRequestException(
          "Please Add Your Card Details For Payment"
        );

      const checkCardExist = await this.checkCardExist(
        getOrderPaymentDetails.customerId,
        cardId
      );

      if (!checkCardExist) {
        throw new BadRequestException("Card Does Not Exist");
      } else {
        const paymentMethod = await stripe.paymentMethods.create(
          {
            customer: customerAccount.accountId,
            payment_method: cardId,
          },
          {
            stripeAccount: storeAccount.accountId,
          }
        );

        const updatePaymentIntent = await stripe.paymentIntents.update(
          getOrderPaymentDetails.paymentIntentId,
          { payment_method: paymentMethod.id },
          {
            stripeAccount: storeAccount.accountId,
          }
        );

        const confirmPaymentIntent = await stripe.paymentIntents.confirm(
          getOrderPaymentDetails.paymentIntentId,
          {
            stripeAccount: storeAccount.accountId,
          }
        );

        return confirmPaymentIntent;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * Check Store Payment Details Exist
   * @param {*} storeId
   * @returns
   */
  static async checkStorePaymentDetailsExist(storeId) {
    return await knex("store_payment_details")
      .where("storeId", storeId)
      .first();
  }

  /**
   * Add Store Payment Receiving Details
   * @param {*} storeId
   * @param {*} storeAccountId
   */
  static async addStorePaymentReceivingDetails(storeId, storeAccountId) {
    const userDetails = await knex("users").where("id", storeId).first();
    let profileStatus = userDetails.profileStatus;
    if (profileStatus == 2) {
      profileStatus = 3;
    }

    await knex("users")
      .update({ profileStatus, isPaymentDetails: 2 })
      .where("id", storeId);
    await knex("store_payment_details").insert({
      storeId,
      accountId: storeAccountId,
    });
  }

  /**
   * Add Customer Payment Details
   * @param {*} userId
   * @param {*} customerAccountId
   */
  static async addCustomerPaymentDetails(userId, customerAccountId) {
    await knex("customer_payment_details").insert({
      customerId: userId,
      accountId: customerAccountId,
    });
  }

  /**
   * Add Customer Card Details
   * @param {*} userId
   * @param {*} cardTokenId
   * @param {*} cardId
   */
  static async addCustomerCardDetails(userId, cardTokenId, cardId) {
    await knex("customer_card_details").insert({
      customerId: userId,
      cardToken: cardTokenId,
      cardId,
    });
  }

  /**
   * Check Store Payment Details Verified Or Not
   * @param {*} storeId
   * @returns
   */
  static async checkStorePaymentDetailsVerifiedOrNot(storeId) {
    const accountData = await this.checkStorePaymentDetailsExist(storeId);
    if (!accountData) {
      throw new BadRequestException("First Add Payment Method");
    }

    const getAccount = await stripe.accounts.retrieve(accountData.accountId);

    if (getAccount.payouts_enabled !== true) {
      const accountLink = await stripe.accountLinks.create({
        account: accountData.accountId,
        refresh_url: "https://example.com",
        return_url: "https://example.com",
        type: "account_onboarding",
      });
      return { url: accountLink.url };
    }
    await knex("users").update("isPaymentDetails", 1).where("id", storeId);
    return { message: "success" };
  }

  /**
   * Check Customer Payment Account Exist Or Not
   * @param {*} customerId
   * @returns
   */
  static async checkCustomerPaymentAccountExist(customerId) {
    return await knex("customer_payment_details").where({ customerId }).first();
  }

  /**
   * Check Card Details Exist Or Not
   * @param {*} userId
   * @param {*} cardId
   * @returns
   */
  static async checkCardExist(userId, cardId) {
    return await knex("customer_card_details")
      .where("customerId", userId)
      .where("cardId", cardId)
      .whereNull("deletedAt")
      .first();
  }

  /**
   * Get Order Payment Details By OrderId
   * @param {*} orderId
   * @returns
   */
  static async getOrderPaymentDetails(orderId) {
    return await knex("order_payment_details").where({ orderId }).first();
  }
}

export default PaymentService;

// const payment = await stripe.paymentIntents.create({
//         amount: amount,
//         currency: "usd", // NOT suppourted test account in india
//         payment_method_types: ["card"],
//         payment_method: cardId,
//         capture_method: "automatic", // set manual if you want to accept payment
//         receipt_email: "dhruv@mailinator.com",
//         confirmation_method: "automatic",
//         confirm: true,
//         customer: customerId,
//         transfer_group: "12121232",
//         stripeAccount: "acct_1L3GdoPqOQRVDzj6",
//       });

//       // const paymentMethod1 = await stripe.paymentMethods.create({
//       //   type: "card",
//       //   card: cardId,
//       //   billing_details: {
//       //     name: "dhru"
//       //   }
//       // });

//       console.log(payment);

//       // const paymentMethod = await stripe.paymentMethods.create(
//       //   {
//       //     customer: customerId,
//       //     payment_method: payment.id,
//       //   },
//       //   {
//       //     stripeAccount: "acct_1L3GdoPqOQRVDzj6",
//       //   }
//       // );

//       // const transfer = await stripe.transfers.create({
//       //   amount: amount,
//       //   currency: "usd",
//       //   destination: "acct_1L3GdoPqOQRVDzj6",
//       //   transfer_group: payment.transfer_group,
//       // });
//       // const createCharge = await stripe.charges.create({
//       //   receipt_email: "dhruv@mailinator.com",
//       //   amount: amount,
//       //   currency: "usd",
//       //   // source: "tok_1L1TxlSH1Lcf4nbMYv2mXu7D",
//       //   card: cardId,
//       //   customer: customerId,
//       //   confirm: true
//       // });
//       // return payment

//       console.log(payment);
//       return payment;
//     } catch (error) {
//       return error;
//     }

//   static async createSellerAccount(bankDetails, ip, req) {
//     // console.log(bankDetails);
//     const bankToken = await stripe.tokens.create({
//       bank_account: {
//         country: "us",
//         currency: "USD",
//         account_number: bankDetails.account_number,
//         routing_number: bankDetails.routing_number,
//         account_holder_type: "company",
//         account_holder_name: bankDetails.account_holder_name,
//       },
//     });

//     const fileFront = await stripe.files.create({
//       purpose: "identity_document",
//       file: {
//         data: fs.readFileSync(
//           "public/store-items/5b890cba-3e51-4c09-b82c-ba84b4172eec.png"
//         ),
//         name: "front.jpg",
//         type: "application/octet-stream",
//       },
//     });

//     const fileBack = await stripe.files.create({
//       purpose: "identity_document",
//       file: {
//         data: fs.readFileSync(
//           "public/store-items/8aad948b-71e8-4feb-a78e-e7ba9fe832a1.png"
//         ),
//         name: "back.jpg",
//         type: "application/octet-stream",
//       },
//     });

//     // function now() {
//     //   return Math.round(new Date().getTime() / 1000);
//     // }

//     const account = await stripe.accounts.create({
//       type: "custom",
//       country: "US",
//       // requested_capabilities: ["transfers"],
//       business_type: "individual",
//       capabilities: {
//         card_payments: { requested: true },
//         transfers: { requested: true },
//       },
//       external_account: bankToken.id,
//       tos_acceptance: {
//         date: Math.round(new Date().getTime() / 1000),
//         ip: ip,
//       },
//       business_profile: {
//         mcc: 7623,
//         url: "https://filed.com",
//       },
//       individual: {
//         first_name: "helol",
//         last_name: "patel",
//         email: "dpdp@mailinator.com",
//         phone: "+13187459467",
//         id_number: "123456789",
//         dob: {
//           day: 1,
//           month: 1,
//           year: 1901,
//         },
//         address: {
//           city: "Fairbanks",
//           country: "US",
//           line1: "919 Stimple Ct",
//           line2: "Stimple Ct",
//           postal_code: "99712",
//           state: "Alaska",
//         },
//         verification: {
//           document: { front: fileFront.id, back: fileBack.id },
//         },
//       },
//     });

//     const bankFront = await stripe.files.create(
//       {
//         purpose: "account_requirement",
//         file: {
//           data: fs.readFileSync(
//             "public/store-items/5b890cba-3e51-4c09-b82c-ba84b4172eec.png"
//           ),
//           name: "front.jpg",
//           type: "application/octet-stream",
//         },
//       },
//       {
//         stripeAccount: account.id,
//       }
//     );

//     const bankBack = await stripe.files.create(
//       {
//         purpose: "account_requirement",
//         file: {
//           data: fs.readFileSync(
//             "public/store-items/8aad948b-71e8-4feb-a78e-e7ba9fe832a1.png"
//           ),
//           name: "back.jpg",
//           type: "application/octet-stream",
//         },
//       },
//       {
//         stripeAccount: account.id,
//       }
//     );

//     // console.log(account);
//     // const accountss = await stripe.accounts.update(account.id, {
//     //   tos_acceptance: {
//     //     date: Date.now(),
//     //     ip: ip,
//     //   },
//     // });
//     // console.log(account.requirements.currently_due);
//     // console.log(new Date());
//     // console.log(Date.now());

//     // const accountLink = await stripe.accountLinks.create({
//     //   account: account.id,
//     //   refresh_url: "https://example.com",
//     //   return_url: "https://example.com",
//     //   type: "account_onboarding",
//     // });

//     // const person = await stripe.accounts.createPerson(account.id, {
//     //   first_name: "helol",
//     //   last_name: "patel",
//     //   email: "dpdp@mailinator.com",
//     //   phone: "+13187459467",
//     //   id_number: "123456789",
//     //   dob: {
//     //     day: 1,
//     //     month: 1,
//     //     year: 1901,
//     //   },
//     //   address: {
//     //     city: "Miami",
//     //     country: "US",
//     //     line1: "2355 ",
//     //     line2: "Mulberry Lane",
//     //     postal_code: "33169",
//     //     state: "FL",
//     //   },
//     //   relationship: {
//     //     title: "owner",
//     //     percent_ownership: 40,
//     //     owner: true,
//     //     representative: false,
//     //   },
//     // });
//     // const token = await stripe.tokens.create(
//     //   {
//     //     customer: "cus_Lqo6p5FXF3ZKYX",
//     //   },
//     //   {
//     //     stripeAccount: "acct_1L8z1e2SUwveA4YI",
//     //   }
//     // );

//     // const customers = await stripe.customers.create(
//     //   {
//     //     source: token.id,
//     //   },
//     //   {
//     //     stripeAccount: "acct_1L8z1e2SUwveA4YI",
//     //   }
//     // );

//     // const cardToken = await stripe.tokens.create({
//     //   card: {
//     //     name: "Harry",
//     //     number: "4242424242424242",
//     //     exp_month: 6,
//     //     exp_year: 2023,
//     //     cvc: "314",
//     //   },
//     // });

//     // const paymentIntent = await stripe.charges.create(
//     //   {
//     //     amount: 1000,
//     //     currency: "usd",
//     //     source: cardToken.id,
//     //     customer: customers.id,
//     //   },
//     //   {
//     //     stripeAccount: "acct_1L8z1e2SUwveA4YI",
//     //   }
//     // );
//     // console.log(paymentIntent);

//     // const updateAccount = await stripe.accounts.update(account.id, {
//     //   individual: {
//     //     verification: { document: { front: fileFront.id, back: fileBack.id } },
//     //     bank_account_ownership_verification: {
//     //       document: { front: bankFront.id, back: bankBack.id },
//     //     },
//     //   },
//     // });

//     // const updatedAccount = await stripe.accounts.update(account.id, {
//     //   bank_account_ownership_verification: {
//     //     verification: { document: { front: bankFront.id, back: bankBack.id } },
//     //   },
//     // });

//     const getAccount = await stripe.accounts.retrieve(account.id);
//     // const accountData = await stripe.accounts.update(
//     //   account.id,
//     //   {
//     //     tos_acceptance: {
//     //       date: Math.floor(Date.now() / 1000),
//     //       ip: req.connection.remoteAddress, // Assumes you're not using a proxy
//     //     },
//     //   }
//     // );
//     console.log(getAccount.requirements.errors);
//     console.log(getAccount);

//     // console.log(person);

//     // const externalAccount = await stripe.accounts.createExternalAccount(
//     //   account.id,
//     //   { external_account: bankToken.id }
//     // );

//     // console.log({ bankToken, account });

//     return { bankToken, accountLink };
//   }
// }
