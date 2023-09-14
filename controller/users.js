const fs = require("fs");
// const index = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const users = data.users;
const mongoose =require('mongoose')
const model = require("../model/user");
const jwt = require('jsonwebtoken');
const { exec } = require("child_process");
const users = model.user;


 exports.getAll= async (req,res)=>{
    // res.status(201).json(users)
    const alluser = await users.find().exec();
  res.json(alluser)
  }
  exports.get= async (req,res)=>{
    const id= req.params.id
    // console.log(req.params.id)
    // const model =users.find(p=>id==p.id)
    // res.json(model)
    const user= await users.findById(id).populate('cart').exec();
  res.json(user)

  }
  exports.replace= async (req,res)=>{
    const id= req.params.id
    // const modelIndex =users.findIndex(p=>id==p.id)
    // users.splice(modelIndex,1,{id:id,...req.body})
    // res.status(201).json()
    const upuser= await users.findOneAndReplace({_id:id},req.body,{returnDocument:'after'});
  res.json(upuser)
  }
  exports.update= async (req,res)=>{
    const id= req.params.id
    const upuser= await users.findOneAndUpdate({_id:id},req.body,{returnDocument:'after'});
  res.json(upuser)
    // const modelIndex =users.findIndex(p=>id==p.id)
    // const model = users[modelIndex]
    // users.splice(modelIndex,1,{...model,...req.body})
    // res.status(201).json()
  }
  exports.delete= async (req,res)=>{
    const id= req.params.id
    const deluser= await users.findOneAndDelete({_id:id},req.body,{returnDocument:'after'});
  res.json(deluser)
    // const modelIndex =users.findIndex(p=>id==p.id)
    // const model = users[modelIndex]
    // users.splice(modelIndex,1)
    // res.status(201).json(model)
  }