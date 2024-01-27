import express from "express";
import { CartItemController } from "./cart.controller.js";

const CartRouter = express.Router();

const cartController = new CartItemController();
CartRouter.get("/", (req, res, next) => {
  cartController.getUserCart(req, res, next);
});

CartRouter.post("/", (req, res, next) => {
  cartController.addToCart(req, res, next);
});
CartRouter.delete("/delete/:productId", (req, res, next) => {
  cartController.deleteFromCart(req, res, next);
});
export default CartRouter;
