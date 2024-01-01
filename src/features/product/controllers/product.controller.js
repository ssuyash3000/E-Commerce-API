import ProductModel from "../product.model.js";
export default class ProductController {
  getAllProducts(req, res) {
    //console.log("getAllProducts called");
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }
  addProduct(req, res) {
    //console.log("addProduct called");
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      size: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdProd = ProductModel.add(newProduct);
    res.status(201).send(createdProd);
  }
  rateProduct(req, res) {}
  getOneProduct(req, res) {
    //console.log("getOneProduct called");
    const id = req.params.id;
    const prod = ProductModel.get(id);
    if (!prod) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).send(prod);
    }
  }
  filterProducts(req, res) {
    console.log("filterProducts called");
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const prod = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(prod);
  }
}
