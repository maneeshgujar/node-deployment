require('dotenv').config()
const express = require("express");
const { send } = require("process");
const { serialize } = require("v8");
const morgan = require("morgan");
const path=require('path')
const authRouter= require('./routes/auth')
const productRouter =require('./routes/product')
const userRouter =require('./routes/users')
const mongoose =require('mongoose')
const cors =require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const publicKey= fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8')
const session = require('express-session')




//mongodb atlas user passwords
// dTAoru674pRYEG6H

// console.log(process.env.mongo_atlas_pwd_maneesh_01)


const server = express();


//db connection
main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  await mongoose.connect(process.env.mongo_url);
  console.log('database connected')

}


//middleware
const auth= ((req,res,next)=>{
  try{
    const token= req.get('Authorization').split('Bearer ')[1];
  console.log(token)
  // var decoded = jwt.verify(token, process.env.secret);
  var decoded = jwt.verify(token, publicKey);
  console.log(decoded)
  if(decoded.email){
    next();
  }else{
    res.sendStatus(401)
  }
  }
  catch{
    res.sendStatus(401)
  }
})


server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge:6000 }   // make secure : true incase you are using HTTPS
}))

const view= function(req, res) {
  if (req.session.views) {
    req.session.views++
    res.json({views:req.session.views})
    console.log({views:req.session.views})
  } else {
    req.session.views = 1
    res.send('welcome to the session demo. refresh!')
  }
}

server.use(cors());
// server.use(morgan('default'))
// server.use(express.static("public"));
server.use(express.static(process.env.PUBLIC_DIR));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use('/auth',authRouter.router)
server.use('/products',productRouter.router)
// server.use('/users',auth,userRouter.router)
server.use('/users',userRouter.router)
server.use('/view',view)

server.use('*',(req,res)=>{
  // res.sendFile(__dirname+'/build/index.html')
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})



// server.use((req,res,next)=>{
//   console.log(req.method, req.ip, req.hostname,new Date(), req.get('User-Agent'))
//   next()
// })

// const auth= (req,res,next)=>{
//   // if(req.query.password==123)next();
//   if(req.body.password==123)next();
//   else res.sendStatus(401);
// }

// server.use(auth)

//API-endpoint-route
// server.get('/product/:id',(req,res)=>{
//   console.log(req.params)
//   res.json({type:"get"})})
// server.post('/',auth,(req,res)=>{res.json({type:"post"})})
// server.put('/',(req,res)=>{res.json({type:"put"})})
// server.delete('/',(req,res)=>{res.json({type:"delete"})})
// server.patch('/',(req,res)=>{res.json({type:"patch"})})

server.get("/demo", (req, res) => {
  // res.send('hello')
  // res.sendFile('/Users/maneesh/Desktop/codes/webdevelopment/nodejs/express/index.html')
  // res.json(products)
  // res.sendStatus(404)
  // res.status(404).send('not found bro')
});

//api root base url
// C R U D

//create POST /products
//read GET /products
//read GET /product/:id
//update PUT /product/:id
//update PATCH /product/:id
//delete DELETE /product/:id







server.listen(5000, () => console.log("server started"));
// server.listen(process.env.PORT, () => console.log("server started"));
