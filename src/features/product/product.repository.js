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
  async filter(minPrice, maxPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (categories) {
        filterExpression = {
          $and: [{ category: { $in: categories } }, filterExpression],
        };
      }
      return collection
        .find(filterExpression)
        .project({ name: 1, price: 1, ratings: { $slice:2 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw ApplicationError("Something went wrong", 503);
    }
  }
  async rate(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      // 1. Remove existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: { ratings: { userId: new ObjectId(userId) } },
        }
      );
      // 2. Add new entry
      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: { ratings: { userId: new ObjectId(userId), rating } },
        }
      );
      // // 1. Find the product
      // const product = await collection.findOne({
      //   _id: new ObjectId(productId),
      // });
      // // 2. Find the rating
      // const userRating = product?.ratings?.find((r) => r.userId == userId);
      // // 3. Update the Rating if userRating exists
      // if (userRating) {
      //   //Update user rating in the ratings array of the prod document
      //   await collection.updateOne(
      //     {
      //       _id: new ObjectId(productId),
      //       "ratings.userId": new ObjectId(userId),
      //     },
      //     {
      //       $set: { "ratings.$.rating": rating },
      //     }
      //   );
      // } else {
      //   await collection.updateOne(
      //     {
      //       _id: new ObjectId(productId),
      //     },
      //     {
      //       $push: { ratings: { userId: new ObjectId(userId), rating } },
      //     }
      //   );
      // }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}
export default ProductRepository;
