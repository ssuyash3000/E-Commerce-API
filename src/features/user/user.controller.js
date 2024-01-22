import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserController {
  constructor() {
    this.userRepsitory = new UserRepository();
  }
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    //console.log(req.body);
    const newUser = UserModel.SignUp(name, email, password, type);
    await this.userRepsitory.SignUp(newUser);
    res.status(201).send(newUser);
  }
  async signIn(req, res) {
    const { email, password } = req.body;
    let result = null;
    try {
      result = await this.userRepsitory.SignIn(email, password);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something wrong with database", 503);
    }
    if (!result) {
      res.status(400).send("Incorrect Credential");
    } else {
      // 1. Create our token on successful login
      const token = jwt.sign(
        { userId: result.id, email: result.email },
        "D4FFE83A3C1B4F69",
        {
          expiresIn: "1h",
        }
      );
      // 2. Send the token
      res.status(200).send(token);
    }
  }
}
