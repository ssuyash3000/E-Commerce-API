//Manage routes/paths to Product controller

// 1. Import Express
import express from "express";
import UserController from "./user.controller.js";
import multer from "multer";

// Note - content-type header of form-data in postman
// is by default set to multipart, in case user sends
// data in form-data fromat from postman multer middleware
// is required to process it.
const processTextData = new multer();

// 2. Initialize Express router
const UserRouter = express.Router();

// 3. Paths to all the type of controller

const userController = new UserController();
UserRouter.post("/signIn", (req, res, next) => {
  userController.signIn(req, res);
});
UserRouter.post("/signUp", processTextData.none(), (req, res, next) => {
  userController.signUp(req, res, next);
});

export default UserRouter;
