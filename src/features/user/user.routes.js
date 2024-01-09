//Manage routes/paths to Product controller

// 1. Import Express
import express from "express";
import UserController from "./user.controller.js";

// 2. Initialize Express router
const UserRouter = express.Router();

// 3. Paths to all the type of controller

const userController = new UserController();
UserRouter.post("/signIn", userController.signIn);
UserRouter.post("/signUp", userController.signUp);

export default UserRouter;
