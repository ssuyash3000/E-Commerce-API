export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, size) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.size = size; // will only apply to cloth category
  }
  static getAll() {
    return products;
  }
  static add(newProd) {
    let prod = {
      id: products.length + 1,
      ...newProd,
    };
    products.push(prod);
    return prod;
  }
  static get(id) {
    const prod = products.find((i) => i.id == id);
    return prod;
  }
  static filter(minPrice, maxPrice, category) {
    const prod = products.filter((currProd) => {
      return (
        (!maxPrice || currProd.price <= maxPrice) &&
        (!minPrice || currProd.price >= minPrice) &&
        (!category || category === currProd.category)
      );
    });
    return prod;
  }
}
var products = [
  {
    "id": 1,
    "name": "Product 1",
    "desc": "Description for Product 1",
    "price": 19.99,
    "imageUrl":
      "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "category": "Category1",
  },
  {
    "id": 2,
    "name": "Product 2",
    "desc": "Description for Product 2",
    "price": 29.99,
    "imageUrl":
      "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "category": "Category2",
    "size": ["s", "m", "L", "XL"],
  },
  {
    "id": 3,
    "name": "Product 3",
    "desc": "Description for Product 3",
    "price": 39.99,
    "imageUrl":
      "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "category": "Category2",
    "size": ["XL"],
  },
];
