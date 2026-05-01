const mongoose = require("mongoose");

const ownerModel = mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true
    },
    email:String,
    password:String,
    product: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
],

    gtsid:Number,
    picture:String
});

module.exports = mongoose.model('owner',ownerModel);