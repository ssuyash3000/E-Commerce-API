//Manage routes/paths to Product controller

// 1. Import Express
import express from "express";
import ProductController from "./controllers/product.controller.js";
import { uploadMiddleware } from "../../middlewares/fileupload.middleware.js";

// 2. Initialize Express router
const ProductRouter = express.Router();

// 3. paths to all the type of controller
// Note - /api/product part of the request
// is already filtered in the server.js file
// Hence, here we will specify path to controller
// always that after the /api/product
const productController = new ProductController();
ProductRouter.post("/rate", productController.rateProduct);
ProductRouter.get("/", productController.getAllProducts);
ProductRouter.post(
  "/",
  uploadMiddleware.single("imageUrl"),
  productController.addProduct
);
ProductRouter.get("/filter", productController.filterProducts);
ProductRouter.get("/:id", productController.getOneProduct);
//ProductRouter.get("/filter", productController.filterProducts);
export default ProductRouter;
