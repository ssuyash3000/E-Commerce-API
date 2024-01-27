import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class CartRepository {
  constructor() {
    this.collection = "cart";
  }
  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);
      let { productId, userId, quantity } = newProduct;
      await collection.updateOne(
        { productId, userId },
        { $setOnInsert: { _id: id }, $inc: { quantity: quantity } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in db", 503);
    }
  }
  async get(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in db", 503);
    }
  }
  async delete(userId, productId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({ userId, productId });
      // Deleted count greater than 0 would mean that record was found
      // and deleted successfully
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong in db", 503);
    }
  }
  async getNextCounter(db) {
    const counter = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    //console.log(counter);
    return counter.value;
  }
}

export default CartRepository;
