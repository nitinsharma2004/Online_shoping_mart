const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  sdate: { type: String, required: true },
  ddate: { type: String, required: true },
  product: {
    type: {
      _id: { type: String, required: true },
      address: String,
      city: String,
      location:String,
      pin: String,
      mnumber: String,
      odate:Date,
      total: Number,
      damount:Number,
      uname:String,
      uemail:String,
      baddress:String,
      cardNumber: Number,
      expiryDate: String, 
      cvv: String,
      usertype:String,
      items: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          color:{type:String},
          amount: { type: Number, required: true },
          image: { type: String, required: true },
          _id: { type: String, required: true },
        },
      ],
    }
  },
});

const OrderDetail = mongoose.model('OrderDetail', orderSchema);

module.exports = OrderDetail;
