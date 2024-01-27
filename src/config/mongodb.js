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
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      createCounter(client.db());
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
