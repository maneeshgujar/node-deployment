const mongoose =require('mongoose')
const {Schema}=mongoose;
// const schema= mongoose.Schema;
//schema
const productSchema= new Schema({
    title: {type:String,required:true,unique:true},
    description: {type:String},
    price: {type:Number,required:true, min:[0,'wrong price']},
    discountPercentage: {type:Number, min:[0,'wrong min discount'],max:[90,'wrong max discount']},
    rating: {type:Number, min:[0,'wrong min rating'],max:[90,'wrong max rating'], default:0},
    brand: {type:String,required:true},
    category: {type:String,required:true},
    thumbnail: {type:String,required:true},
    images:[String]
  });
  
  //model
  exports.product = mongoose.model('product', productSchema);