import PaymentService from "./payments.service";

class CartController {
  /**
   * Create Customer
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async createCustomer(req, res) {
    const customer = await PaymentService.createCustomer(
      req.body.email,
      req.body.phone,
      req.user.id
    );
    return res.send({ message: "success", customer });
  }

  /**
   * Add New Customer Card
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async addNewCard(req, res) {
    const card = await PaymentService.addNewCard(req.body, req.user.id);
    return res.send({ message: "Card Added Successfully." });
  }

  /**
   * Get All Saved Card Details By Customer ID
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getAllSavedCards(req, res) {
    const getAllSavedCards = await PaymentService.getAllSavedCards(req.user.id);

    return res.send({ data: getAllSavedCards });
  }

  /**
   * Update Card By CardId
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async updateCardById(req, res) {
    const updateCardById = await PaymentService.updateCardById(
      req.user.id,
      req.params.cardId,
      req.body
    );

    return res.send({ message: "Update Card Succesfully" });
  }

  /**
   * Delete Card By CardId
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deleteCardById(req, res) {
    const deleteCardById = await PaymentService.deleteCardById(
      req.user.id,
      req.params.cardId
    );

    return res.send({ message: "Delete Card Succesfully" });
  }

  /**
   * Create Charges
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async createCharges(req, res) {
    const charges = await PaymentService.createCharges(
      req.body.amount,
      req.body.cardId,
      req.body.customerId
    );
    return res.send({ message: charges, id: charges.id });
    // return res.send({data : {status : card.status , amount :card.amount}});
  }

  /**
   * Create Store Payment Receieving Account
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async createSellerAccount(req, res) {
    const sellerAccount = await PaymentService.createSellerAccount(
      req.body,
      req.files.bank_document,
      req.user.id
    );

    return res.send(sellerAccount);
  }

  /**
   * Get Store Payment Bank Account Info
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async storePaymentBankAccountInfo(req, res) {
    const storePaymentAccountInfo =
      await PaymentService.storePaymentBankAccountInfo(req.user.id);

    return res.send({ data: storePaymentAccountInfo });
  }

  /**
   * get Store Account Verification link
   * @param {*} req
   * @param {*} res
   */
  static async storeAccountVerificationLink(req, res) {
    const storeAccountVerificationLink =
      await PaymentService.checkStorePaymentDetailsVerifiedOrNot(req.user.id);

    return res.send(storeAccountVerificationLink);
  }

  /**
   * Create Store Payment Receieving Account
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async updatePendingOrderPayment(req, res) {
    const updatePendingOrderPayment =
      await PaymentService.updatePendingOrderPayment(
        req.body.orderId,
        req.body.cardId
      );
    // return res.send(updatePendingOrderPayment);
    return res.send({ data: updatePendingOrderPayment });
  }
}

export default CartController;
