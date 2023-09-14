const mongoose =require('mongoose')
const {Schema}=mongoose;

const userSchema = new Schema({
    firstName:{type:String, required:true},
    lastName:String ,
    cart:[{ type: Schema.Types.ObjectId, ref: 'product' }],
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
              return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          }
    },
    password:{ type:String, required :true,  min:6 },
    token:String
})

exports.user= mongoose.model('user',userSchema);