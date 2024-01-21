import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
  constructor(name, email, password, type) {
    //this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static async SignUp(name, email, password, type) {
    // 1. Get the database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection("users");
    const newUser = new UserModel(
      //users.length + 1,
      name,
      email,
      password,
      type
    );
    // 3. Insert the user into the collection
    try {
      await collection.insertOne(newUser);
    } catch (err) {
      throw new ApplicationError("Something went wrong", 503);
    }
    //users.push(newUser);
    return newUser;
  }
  static SignIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getAlluser() {
    return users;
  }
}
//Creating List of Dummy Users
var users = [
  {
    id: 2,
    name: "Customer User",
    email: "customer@com.com",
    password: "Password1",
    type: "customer",
  },
  {
    id: 1,
    name: "Seller User",
    email: "seller@com.com",
    password: "Password1",
    type: "seller",
  },
];
