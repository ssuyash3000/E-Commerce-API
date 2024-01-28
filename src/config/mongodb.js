import { MongoClient } from "mongodb";
const url = process.env.DB_URL;
let client = null;
const createCounter = async (db) => {
  const exisitingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!exisitingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("product").createIndex({ price: 1 });
    await db.collection("product").createIndex({ name: 1, category: -1 });
    await db.collection("product").createIndex({ desc: "text" });
    console.log("Indexes are created");
  } catch (err) {
    console.log(err);
  }
};
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      createCounter(client.db());
      createIndexes(client.db());
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db();
};
export default connectToMongoDB;
