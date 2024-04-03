import CustomerService from "./customer.service";

class CustomerController {
  /**
   * customer list
   * @param {object} req
   * @param {object} res
   */
  static async index(req, res) {
    if (req.xhr) {
      const data = await CustomerService.getCustomers(req);
      return res.json(data);
    }
    return res.render("admin/customers", { page: "customers" });
  }
}

export default CustomerController;
