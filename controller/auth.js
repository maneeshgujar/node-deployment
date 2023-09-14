
const model = require("../model/user");
const jwt = require('jsonwebtoken');
const { exec } = require("child_process");
const users = model.user;
const fs = require('fs');
const path = require('path')
const bcrypt= require('bcrypt')
const privateKey= fs.readFileSync(path.resolve(__dirname,'../private.key'),'utf-8')



exports.signup= async (req,res)=>{
    const user= new users(req.body)
    // const token = jwt.sign({ email: req.body.email }, process.env.secret);
    const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
    const hash = bcrypt.hashSync(req.body.password.toString(), 10);
    user.token=token;
    user.password= hash;
    user.save().then(function (doc) {
      res.json(doc);
    })
    .catch(function (err) {
      res.json(err);
    });
      // users.push(req.body)
      // res.json(req.body)
    }

    exports.signin= async (req,res)=>{
        try{
            const user= await users.findOne({email:req.body.email})
            const check =bcrypt.compareSync(req.body.password.toString(), user.password);
            if(check){
                const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
                user.token=token;
                user.save().then(function (doc) {
                    res.json(doc);
                  })
                  .catch(function (err) {
                    res.json(err);
                  });
            }else{
                res.sendStatus(401);
            }
        }
        catch{
            res.sendStatus(401);
        }
       }