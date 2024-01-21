import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017/ecommdb";
let client = null;
const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDB = () =>{
  return client.db();
}
export default connectToMongoDB;
