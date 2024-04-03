import CartService from "./carts.service";
import CartModel from "./resource/carts.resource";

class CartController {
  /**
   * Add items in cart
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async addToCart(req, res) {
    await CartService.addToCart(req.body, req.user.id);
    return res.send({ message: "success" });
  }

  /**
   * Get Cart Details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getCartDetails(req, res) {
    const cartData = await CartService.getCartDetails(req.user.id);
    return res.send({ data: new CartModel(cartData) });
  }

  /**
   * Is Cart Exist Or Not
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async isCartExist(req, res) {
    const replaceCart = await CartService.replaceCartOrNOt(
      req.user.id,
      req.query.storeId
    );
    return res.send({ replaceCart });
  }
}

export default CartController;
