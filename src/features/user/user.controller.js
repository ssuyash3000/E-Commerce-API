import { UserModel } from "./user.model.js";
export default class UserController {
  signIn(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const result = UserModel.SignIn(email, password);
    if (!result) {
      res.status(400).send("Incorrect Credential");
    } else {
      res.status(200).send("Login Successful");
    }
  }
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    console.log(req.body);
    const user = UserModel.SignUp(name, email, password, type);
    res.status(201).send(user);
  }
}
