import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
class UserRepository {
  async SignUp(newUser) {
    // 1. Get the database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection("users");

    // 3. Insert the user into the collection
    try {
      await collection.insertOne(newUser);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 503);
    }
    //users.push(newUser);
    return newUser;
  }
  async SignIn(email, password) {
    // 1. Get the database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection("users");

    // 3. Find the user in the collection
    try {
      return await collection.findOne({ email, password });
    } catch (err) {
      throw new ApplicationError("Something went wrong", 503);
    }
  }
}
export default UserRepository;
