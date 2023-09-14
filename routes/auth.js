const express = require("express");
const authRouter = express.Router();
const authcontroller = require('../controller/auth');

authRouter
.post("/signup", authcontroller.signup)
.post("/signin", authcontroller.signin)


exports.router=authRouter