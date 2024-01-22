import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepsitory = new UserRepository();
  }
  async signUp(req, res, next) {
    const { name, email, password, type } = req.body;
    // 0. Checking if the user with the passed email already exsits
    try {
      let user = this.userRepsitory.findByEmail(email);
      if (user) {
        throw new ApplicationError("User already exists", 409);
      }
      //console.log(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = UserModel.SignUp(name, email, hashedPassword, type);
      await this.userRepsitory.SignUp(newUser);
      delete newUser.password;
      res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await this.userRepsitory.findByEmail(email);
      if (!user) {
        return res.status(400).send("Incorrect Credential");
      } else {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
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
        } else {
          res.status(400).send("Incorrect Credential");
        }
      }
      //result = await this.userRepsitory.SignIn(email, password);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something wrong with database", 503);
    }
  }
}
