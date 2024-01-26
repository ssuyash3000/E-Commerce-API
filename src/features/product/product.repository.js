import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
class ProductRepository {
  constructor() {
    this.collection = "product";
  }
  async add(newProduct) {
    // 1. Get the database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection(this.collection);
    // 3. Insert the product into the collection
    try {
      await collection.insertOne(newProduct);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 503);
    }
    return newProduct;
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw ApplicationError("Something went wrong", 503);
    }
  }
  async rate(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: { ratings: { userId: new ObjectId(userId), rating } },
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}
export default ProductRepository;
