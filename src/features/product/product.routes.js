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
ProductRouter.post("/rate", (req, res, next) => {
  productController.rateProduct(req, res, next);
});
ProductRouter.get("/", (req, res, next) => {
  productController.getAllProducts(req, res, next);
});
ProductRouter.post(
  "/",
  uploadMiddleware.single("imageUrl"),
  (req, res, next) => {
    productController.addProduct(req, res, next);
  }
);
ProductRouter.get("/filter", (req, res, next) => {
  productController.filterProducts(req, res, next);
});
ProductRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});

ProductRouter.get("/:id", (req, res, next) => {
  productController.getOneProduct(req, res, next);
});

//ProductRouter.get("/filter", productController.filterProducts);
export default ProductRouter;
