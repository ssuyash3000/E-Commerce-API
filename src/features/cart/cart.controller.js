import CartModel from "./cart.model.js";
export class CartItemController {
  addToCart(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    CartModel.add(productId, userId, Number(quantity));
    res.status(201).send("Item added in the cart");
  }
  getUserCart(req, res) {
    let cartArr = CartModel.get(req.userId);
    res.status(200).send(cartArr);
  }
  deleteFromCart(req, res) {
    let { productId } = req.params;
    let userId = req.userId;
    let error = CartModel.delete(userId, productId);
    if (!error) {
      res.status(201).send("Product deleted sucessfully");
    } else {
      res.status(404).send(error);
    }
  }
}
