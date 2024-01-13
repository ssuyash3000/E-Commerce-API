import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import UserRouter from "./src/features/user/user.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

const server = express();
// server.use((req, res, next) => {
//   console.log(req.url);
//   console.log("req header", req.headers);
//   next();
// });
//for parsing if data is sent in raw-json format
server.use(bodyParser.json());
// for parsing if data is sent in form-data format
// server.use(express.urlencoded({ extended: true }));
server.use("/api/users", UserRouter);

//for all requests realted to product, redirect to product rotue
//localhost:3400/api/product
server.use("/api/products", jwtAuth, ProductRouter);

//Defualt request handler
server.get("/", (req, res) => {
  res.send("Welcome to this project");
});

server.listen(3400, () => {
  console.log("Server has started at port 3400");
});
