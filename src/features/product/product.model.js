// import { ApplicationError } from "../../error-handler/applicationError.js";
// import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, category, size) {
    //this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.size = size; // will only apply to cloth category
  }
  // static getAll() {
  //   return products;
  // }
  // static add(newProd) {
  //   let prod = {
  //     //id: products.length + 1,
  //     ...newProd,
  //   };
  //   //products.push(prod);
  //   return prod;
  // }
  // static get(id) {
  //   const prod = products.find((i) => i.id == id);
  //   return prod;
  // }

  // static rateProduct(userId, productId, rating) {
  //   // 1. Validate user and Product
  //   // (i.e.existence of both user and product)
  //   // validating user
  //   const user = UserModel.getAlluser().find((u) => u.id === Number(userId));
  //   // if (!user) throw new Error("User not Found");
  //   if (!user) throw new ApplicationError("User not Found", 404);
  //   //validate product
  //   const product = products.find((p) => p.id === Number(productId));
  //   // if (!product) throw new Error("Product not Found");
  //   if (!product) throw new ApplicationError("Product not Found", 404);
  //   // 2. Check if there are any ratings and if not
  //   // then add ratings array
  //   if (!product.ratings) {
  //     product.ratings = []; // adding ratings array
  //     product.ratings.push({ userId, rating });
  //   }
  //   // 3. Check if user rating is already available
  //   // if yes then update, if no then add
  //   else {
  //     const existingRatingIndex = product.ratings.findIndex(
  //       (r) => r.userId === userId
  //     );
  //     if (existingRatingIndex >= 0) {
  //       product.ratings[existingRatingIndex] = { userId, rating };
  //     } else {
  //       product.ratings.push({ userId, rating });
  //     }
  //   }
  // }
  // static filter(minPrice, maxPrice, category) {
  //   const prod = products.filter((currProd) => {
  //     return (
  //       (!maxPrice || currProd.price <= maxPrice) &&
  //       (!minPrice || currProd.price >= minPrice) &&
  //       (!category || category === currProd.category)
  //     );
  //   });
  //   return prod;
  // }
}
var products = [
  {
    id: 1,
    name: "Product 1",
    desc: "Description for Product 1",
    price: 19.99,
    imageUrl:
      "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    category: "Category1",
  },
  {
    id: 2,
    name: "Product 2",
    desc: "Description for Product 2",
    price: 29.99,
    imageUrl:
      "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    category: "Category2",
    size: ["s", "m", "L", "XL"],
  },
  {
    id: 3,
    name: "Product 3",
    desc: "Description for Product 3",
    price: 39.99,
    imageUrl:
      "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    category: "Category2",
    size: ["XL"],
  },
];
