const mongoose = require("mongoose");

const onlinepaymentSchema = new mongoose.Schema({
    damount:Number,
    uname:String,
    uemail:String,
    baddress:String,
    cardNumber: Number,
    expiryDate: String, 
    cvv: String,
    mnumber:Number,
    pin:Number,
    odate:String,
  total:Number,
  usertype:String,
  items: [
    {
      id: { type: String },
      name: { type: String },
      color: { type: String },
      amount: { type: Number },
      image: { type: String },
    }
  ],
});

const PayModel = mongoose.model('Onlinepay', onlinepaymentSchema);
module.exports = PayModel;
