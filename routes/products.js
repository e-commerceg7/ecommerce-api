const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    console.log(Product);
    res.json(await Product.find());
  } catch (error) {
    res.json({ message: error });
  }
});

// POST a new product
router.post("/", async (req, res) => {
  const { name, description, price, color, stock, categories, image } =
    req.body;

  try {
    //create a new product from data thats been sent trough POST
    const newProduct = new Product({
      name,
      description,
      price,
      color,
      stock,
      categories,
      image,
    });
    // Save the new product in the database
    await newProduct.save();
    res.status(201).json({
      message: "Product created succesfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
});

module.exports = router;
