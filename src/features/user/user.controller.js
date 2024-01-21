import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signIn(req, res) {
    const { email, password } = req.body;
    //console.log(req.body);
    const result = UserModel.SignIn(email, password);
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

  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    //console.log(req.body);
    const user = await UserModel.SignUp(name, email, password, type);
    res.status(201).send(user);
  }
}
