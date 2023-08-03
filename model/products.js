const mongoose = require("mongoose");

const schema = mongoose.Schema({
  brand: String,
  type: String,
  addedInYear: String,
  alt: String,
  productName: String,
  image: String,
  description: String,
  price: String,
  oldPrice: String,
  inStock: Boolean,
  discount: String,
  rating: String,
});

exports.products = mongoose.model("products", schema);
