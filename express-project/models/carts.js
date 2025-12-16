const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   id: Number,

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },

//   name: String,
//   price: Number,
//   image: String,
//   description: String,

//   quantity: {
//     type: Number,
//     default: 1
//   }
// });

// module.exports = mongoose.model("Cart", cartSchema);


const cartSchema= new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",required: true
    },
    products:[

      {
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",required: true
      },
      quantity:{type:Number,required:true,min:1,default:1},
    }
    ]
})

module.exports = mongoose.model("carts", cartSchema);
