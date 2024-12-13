const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
