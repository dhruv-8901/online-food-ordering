import AddressService from "./customer-addresses.service";
import AddressResource from "./resource/address.resource";

class AddressController {
  /**
   * address list
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getAddress(req, res) {
    const addresses = await (
      await AddressService.get(req.user.id)
    ).map((address) => new AddressResource(address));

    return res.status(200).json({
      data: addresses,
    });
  }

  /**
   * store new address
   * @param {object} req
   * @param {object} res
   */
  static async store(req, res) {
    const data = req.body;
    data.userId = req.user.id;
    data.isDefault = false;

    const addresses = await AddressService.get(req.user.id);
    if (addresses.length === 0) {
      data.isDefault = true;
    }

    const address = await AddressService.createOrUpdate(data);
    return res.status(200).json({
      data: new AddressResource(address),
    });
  }

  /**
   * update address
   * @param {object} req
   * @param {object} res
   */
  static async update(req, res) {
    const address = await AddressService.createOrUpdate(
      { ...req.body, userId: req.user.id },
      req.params.addressId
    );
    return res.status(200).json({
      data: new AddressResource(address),
    });
  }

  /**
   * delete a address
   * @param {object} req
   * @param {object} res
   */
  static async delete(req, res) {
    await AddressService.delete(req.params.addressId , req.user.id);
    return res.status(200).json({
      message: "address deleted successfully.",
    });
  }
}

export default AddressController;
