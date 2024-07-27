const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

// Reuse existing mongoose connection from server.js
// const db = mongoose.connection;

// Define Inventory Schema with Cuisine Type
const inventorySchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  cuisineType: String // New field for cuisine type
});
const Inventory = mongoose.model("Inventory", inventorySchema);

// GET inventory
router.get("/", function (req, res) {
  res.send("Inventory API");
});

// GET a product from inventory by _id
router.get("/product/:productId", async (req, res) => {
  try {
    if (!req.params.productId) {
      return res.status(400).send("ID field is required.");
    }

    const product = await Inventory.findById(req.params.productId);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    res.send(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Internal server error.");
  }
});

// GET all inventory products
router.get("/products", async (req, res) => {
  try {
    const products = await Inventory.find({});
    console.log("Sending inventory products");
    res.send(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal server error.");
  }
});

// Create inventory product
router.post("/product", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Inventory.create(newProduct);
    res.send(product);
    // Optionally, perform other operations here
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Internal server error.");
  }
});

// Delete inventory product
router.delete("/product/:productId", async (req, res) => {
  try {
    const product = await Inventory.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).send("Product not found.");
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Internal server error.");
  }
});

// Update inventory product
router.put("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Inventory.findByIdAndUpdate(productId, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send("Product not found.");
    }
    res.send(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
