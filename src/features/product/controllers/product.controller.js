import ProductModel from "../product.model.js";
import ProductRepository from "../product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res, next) {
    //console.log("getAllProducts called");
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async addProduct(req, res) {
    //console.log("addProduct called");
    const { name, price, sizes, desc, category } = req.body;
    const newProduct = new ProductModel(
      name,
      desc,
      parseFloat(price),
      req.file.filename,
      category,
      sizes.split(",")
    );
    await this.productRepository.add(newProduct);
    res.status(201).send(newProduct);
  }
  async getOneProduct(req, res) {
    //console.log("getOneProduct called");
    try {
      const id = req.params.id;
      const prod = await this.productRepository.get(id);
      if (!prod) {
        res.status(404).send("Product not found");
      } else {
        res.status(200).send(prod);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async filterProducts(req, res, next) {
    try {
      //console.log("filterProducts called");
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      let categories = req.query.categories;
      categories = JSON.parse(categories.replace(/'/g, '"'));
      //const prod = ProductModel.filter(minPrice, maxPrice, category);
      const prod = await this.productRepository.filter(
        minPrice,
        maxPrice,
        categories
      );
      return res.status(200).send(prod);
    } catch (err) {
      next(err);
    }
  }
  async rateProduct(req, res, next) {
    try {
      const { productId, rating } = req.query;
      const userId = req.userId;
      await this.productRepository.rate(userId, productId, rating);
      res.status(200).send("Rating Added Successfully");
    } catch (err) {
      // in case we want to call the application level middleware from here
      next(err);
    }
  }
  async averagePrice(req, res, next) {
    try {
      let result = await this.productRepository.averageProductPricePerCategory();
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  //const error = ProductModel.rateProduct(userId, productId, rating);
  // try {
  // }catch (err) {
  // res.status(400).send(err.message);
  //}
  // if (error) {
  //   res.status(400).send(error);
  // } else {
  //   res.status(200).send("Rating Added Successfully");
  // }
}
