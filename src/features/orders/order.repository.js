import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }
  async getTotalAmount(userId) {
    try {
      const db = getDB();
      // Setting Up aggreagation pipeline
      const items = await db
        .collection("cart")
        .aggregate([
          // Stage 1 - will give us all the cart documents of a specific user
          {
            $match: { userId: new ObjectId(userId) },
          },
          // Stage 2 - Get the products from products collection (for prices)
          {
            $lookup: {
              from: "product",
              localField: "productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // Stage 3 - Unwind the product info
          {
            $unwind: "$productInfo",
          },
          // Stage 4 - Calculate total amount for each cart item
          {
            $addFields: {
              totalAmount: { $multiply: ["$productInfo.price", "$quantity"] },
            },
          },
        ])
        .toArray();
      return items;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 503);
    }
  }
  // Implementation without Transaction -
  async placeOrder(userId) {
    const db = getDB();
    try {
      // 1. Get cart items and caclculate total amount
      const items = await this.getTotalAmount(userId);
      const totalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      // 2. Create an order record and insert it in order collection
      const newOrder = new OrderModel(
        new ObjectId(userId),
        totalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder);

      // 3. Reduce the stock - in products collection
      for (let item of items) {
        await db.collection("product").updateOne(
          { _id: items.productId },
          {
            $inc: { stock: -item.quantity },
          }
        );
      }
      // 4. Clear the cart items
      await db.collection("cart").deleteMany({ userId: new ObjectId(userId) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 503);
    }
  }
}

// Implementation with Transaction -
// async placeOrder(userId) {
//   const db = getDB();
//   // Importing client -
//   const client = getClient();
//   const session = client.startSession();
//   try {
//     session.startTransaction();
//     // 1. Get cart items and caclculate total amount
//     const items = await this.getTotalAmount(userId);
//     const totalAmount = items.reduce(
//       (acc, item) => acc + item.totalAmount,
//       0
//     );

//     // 2. Create an order record and insert it in order collection
//     const newOrder = new OrderModel(
//       new ObjectId(userId),
//       totalAmount,
//       new Date()
//     );
//     await db.collection(this.collection).insertOne(newOrder, { session });

//     // 3. Reduce the stock - in products collection
//     for (let item of items) {
//       await db.collection("product").updateOne(
//         { _id: items.productId },
//         {
//           $inc: { stock: -item.quantity },
//         },
//         { session }
//       );
//     }
//     // 4. Clear the cart items
//     await db
//       .collection("cart")
//       .deleteMany({ userId: new ObjectId(userId) }, { session });
//     session.commitTransaction();
//     session.endSession();
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log(err);
//     throw new ApplicationError("Something went wrong with database", 503);
//   }
// }
