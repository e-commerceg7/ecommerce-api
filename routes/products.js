const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
//npm start
//http://localhost:5001/products
router.get("/", async (req, res) => {
  try {
    console.log(Product);
    res.json(await Product.find());
  } catch (error) {
    res.json({ message: error });
  }
});

//GET specific product by id
// npm start
// http://localhost:5001/products/675874568c163b7fe8d0b275
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
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

//update a product by id
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Hämta id från URL-parameter
  const { name, description, price, color, stock, categories, image } =
    req.body; // Hämta nya data från request body

  try {
    // Försök att hitta produkten och uppdatera den med de nya värdena
    const updatedProduct = await Product.findByIdAndUpdate(
      id, // Hitta produkt med detta id
      {
        name,
        description,
        price,
        color,
        stock,
        categories,
        image,
      },
      { new: true } // Returnera den uppdaterade produkten istället för den gamla
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Returnera den uppdaterade produkten
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

//delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Försök att hitta och ta bort produkten med det givna id:t
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Returnera ett meddelande om att produkten har raderats
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
