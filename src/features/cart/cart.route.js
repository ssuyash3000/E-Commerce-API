import express from "express";
import { CartItemController } from "./cart.controller.js";

const CartRouter = express.Router();

const cartController = new CartItemController();
CartRouter.get("/", cartController.getUserCart);
CartRouter.post("/", cartController.addToCart);
CartRouter.post("/delete/:productId", cartController.deleteFromCart);
export default CartRouter;
