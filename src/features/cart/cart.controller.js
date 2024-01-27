import { ObjectId } from "bson";
import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";
export class CartItemController {
  constructor() {
    this.cartRepository = new CartRepository();
  }
  async addToCart(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
      let newProduct = new CartModel(
        new ObjectId(userId),
        new ObjectId(productId),
        quantity
      );
      await this.cartRepository.add(newProduct);
      res.status(201).send("Item added in the cart");
    } catch (err) {
      next(err);
    }
  }
  async getUserCart(req, res, next) {
    try {
      let userId = req.userId;
      let cartArr = await this.cartRepository.get(new ObjectId(userId));
      res.status(200).send(cartArr);
    } catch (err) {
      next(err);
    }
  }
  async deleteFromCart(req, res, next) {
    try {
      let { productId } = req.params;
      let userId = req.userId;
      let result = await this.cartRepository.delete(
        new ObjectId(userId),
        new ObjectId(productId)
      );
      if (result) res.status(201).send("Product deleted sucessfully");
      else res.status(404).send(error);
    } catch (err) {
      next(err);
    }
  }
}
