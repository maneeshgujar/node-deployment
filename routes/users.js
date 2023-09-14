const express = require("express");
const userRouter = express.Router();
const usercontroller = require('../controller/users');


userRouter
  .get("/", usercontroller.getAll)
  .get("/:id", usercontroller.get)
  .put("/:id", usercontroller.replace)
  .patch("/:id", usercontroller.update)
  .delete("/:id", usercontroller.delete);

  exports.router=userRouter