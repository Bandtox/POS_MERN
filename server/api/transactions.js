const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Get a reference to the `user` database
// const userDb = mongoose.connection.useDb("user");

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  cart: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    spiceLevel: String
  }],
  total: Number,
  address: String,
  expectedDelivery: String,
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// POST a new transaction
// POST a new transaction
router.post("/", async (req, res) => {
  try {
    const { cart, total, address, expectedDelivery, date } = req.body;
    if (!cart || !total || !address || !expectedDelivery) {
      return res.status(400).send("Required fields are missing.");
    }

    const newTransaction = new Transaction({
      cart,
      total,
      address,
      expectedDelivery,
      date: date ? new Date(date) : undefined // Handle date if provided
    });

    await newTransaction.save();
    res.status(201).send(newTransaction);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).send("Internal server error.");
  }
});

// Get daily sales
router.get("/daily", async (req, res) => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
      const dailySales = await Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfDay, $lt: endOfDay }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$total" },
            count: { $sum: 1 }
          }
        }
      ]);
  
      res.json(dailySales[0] || { totalSales: 0, count: 0 });
    } catch (err) {
      console.error("Error fetching daily sales:", err);
      res.status(500).send("Internal server error.");
    }
  });
  
  // Get monthly sales
  router.get("/monthly", async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  
      const monthlySales = await Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lt: endOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$total" },
            count: { $sum: 1 }
          }
        }
      ]);
  
      res.json(monthlySales[0] || { totalSales: 0, count: 0 });
    } catch (err) {
      console.error("Error fetching monthly sales:", err);
      res.status(500).send("Internal server error.");
    }
  });  

  // Get all transactions
router.get("/", async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send("Internal server error.");
    }
  });
  
  // Update a specific transaction
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { cart, total, address, expectedDelivery, date } = req.body;
  
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { cart, total, address, expectedDelivery, date: date ? new Date(date) : undefined },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).send("Transaction not found.");
      }
  
      res.json(updatedTransaction);
    } catch (err) {
      console.error("Error updating transaction:", err);
      res.status(500).send("Internal server error.");
    }
  });
  
  // Delete a specific transaction
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      if (!deletedTransaction) {
        return res.status(404).send("Transaction not found.");
      }
  
      res.json({ message: "Transaction deleted successfully." });
    } catch (err) {
      console.error("Error deleting transaction:", err);
      res.status(500).send("Internal server error.");
    }
  });
// Get most sold product
router.get("/top-product", async (req, res) => {
    try {
      const topProduct = await Transaction.aggregate([
        { $unwind: "$cart" },
        {
          $group: {
            _id: "$cart.name",
            totalQuantity: { $sum: "$cart.quantity" },
            totalSales: { $sum: { $multiply: ["$cart.price", "$cart.quantity"] } }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 1 }
      ]);
  
      if (topProduct.length > 0) {
        res.json(topProduct[0]);
      } else {
        res.json({ name: "No products", totalQuantity: 0, totalSales: 0 });
      }
    } catch (err) {
      console.error("Error fetching top product:", err);
      res.status(500).send("Internal server error.");
    }
  });
    

module.exports = router;
