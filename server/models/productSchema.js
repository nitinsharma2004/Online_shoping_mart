const mongoose = require("mongoose");
const validator = require("validator");
const keysecret = process.env.SECRET_KEY


const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    company: String,
    price: Number,
    colors: [String],
    image: {
      type: String,
      required: true,

  },
    description: String,
    category: String,
    featured: Boolean,
    stocks:Number,
    star:Number,
    reviews:Number
  });
  
  const Product = mongoose.model('Products', productSchema);
  module.exports = Product;