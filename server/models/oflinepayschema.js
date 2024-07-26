const mongoose = require("mongoose");

const offlinepaymentSchema = new mongoose.Schema({
  uname:String,
  address: String,
  city: String,
  location: String,
  pin: String,
  mnumber: String,
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

const PaymentModel = mongoose.model('Payment', offlinepaymentSchema);
module.exports = PaymentModel;
