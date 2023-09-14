const express = require("express");
const productRouter = express.Router();
const productcontroller = require('../controller/product');


productRouter
  .post("/", productcontroller.createProduct)
  .get("/", productcontroller.getAllProduct)
  .get("/ssr", productcontroller.getAllProductssr)
  .get("/add", productcontroller.addproductssr)
  .get("/:id", productcontroller.getProduct)
  .put("/:id", productcontroller.replaceProduct)
  .patch("/:id", productcontroller.updateProduct)
  .delete("/:id", productcontroller.deleteProduct);

  exports.router=productRouter