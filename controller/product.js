const fs = require("fs");
// const index = fs.readFileSync("index.html", "utf-8");
// const path= require('path');
// const data = JSON.parse(fs.readFileSync(path.resolve,"data.json", "utf-8"));
// const products = data.products;

const mongoose =require('mongoose')
const model = require("../model/product");
const { exec } = require("child_process");
const products = model.product;
const ejs= require('ejs')
const path= require('path')

//server side rendering
exports.getAllProductssr =async (req, res) => {
  
  const allproduct = await products.find().exec();
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'),{products:allproduct}, function(err, str){
    // console.log(str)
    // console.log(err)
    res.send(str);
    // str => Rendered HTML string
});
};

//server side rendering using html form
exports.addproductssr =async (req, res) => {
  
  
  ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'), function(err, str){
    // console.log(str)
    // console.log(err)
    res.send(str);
    // str => Rendered HTML string
});
};

exports.createProduct = (req, res) => {
  const product= new products(req.body);
  // product.title='redmi9pro';
  product.save().then(function (doc) {
    res.json(doc);
  })
  .catch(function (err) {
    res.json(err);
    console.log('error')
  });

  // products.push(req.body)
  // res.json(req.body)
};
exports.getAllProduct =async (req, res) => {
  const query = products.find()
  // console.log(req.query)
  if(req.query.sort){
    const allproduct = await query.sort({[req.query.sort]:req.query.order}).limit(req.query.limit).exec();
  res.json(allproduct)

  }else if(req.query.page){
    const allproduct = await query.skip(4*(req.query.page-1)).limit(4).exec();
  res.json(allproduct)
  }else{
    const allproduct = await query.exec();
  res.json(allproduct)
  }
  
  // res.status(201).json(products);
};
exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product= await products.findById(id).exec();
  res.json(product)

  // // console.log(req.params.id)
  // const product = products.find((p) => id == p.id);
  // res.json(product);
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const upproduct= await products.findOneAndReplace({_id:id},req.body,{returnDocument:'after'});
  res.json(upproduct)

  // const productIndex = products.findIndex((p) => id == p.id);
  // products.splice(productIndex, 1, { id: id, ...req.body });
  // res.status(201).json();
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const upproduct= await products.findOneAndUpdate({_id:id},req.body,{returnDocument:'after'});
  res.json(upproduct)

  // const productIndex = products.findIndex((p) => id == p.id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1, { ...product, ...req.body });
  // res.status(201).json();
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const delproduct= await products.findOneAndDelete({_id:id});
  res.json(delproduct)

  // const productIndex = products.findIndex((p) => id == p.id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1);
  // res.status(201).json(product);
};
