import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";

const server = express();
server.use((req, res, next) => {
  console.log(req.url);
  next();
});
server.use(bodyParser.json());

//for all requests realted to product, redirect to product rotue
//localhost:3400/api/product
server.use("/api/products", ProductRouter);

//Defualt request handler
server.get("/", (req, res) => {
  res.send("Welcome to this project");
});

server.listen(3400, () => {
  console.log("Server has started at port 3400");
});
