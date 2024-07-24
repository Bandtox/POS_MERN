const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Inventory = require('./inventory');

const router = express.Router();
router.use(bodyParser.json());

// Reuse existing mongoose connection from server.js
const db = mongoose.connection;

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
    date: Date,
    total: Number,
    products: Array
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Check MongoDB connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Connected to MongoDB");
// });

// GET root route
router.get('/', (req, res) => {
    res.send('Transactions API');
});

// GET all transactions
router.get('/all', async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.send(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Internal server error.');
    }
});


// GET transactions with limit
router.get('/limit', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 5;
        const transactions = await Transaction.find({}).limit(limit).sort({ date: -1 }).exec();
        res.send(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Internal server error.');
    }
});


// GET total sales for the current day
router.get('/day-total', async (req, res) => {
    try {
        const date = req.query.date ? new Date(req.query.date) : new Date();
        date.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const transactions = await Transaction.find({ date: { $gte: date, $lte: endDate } });
        const totalSales = transactions.reduce((acc, cur) => acc + cur.total, 0).toFixed(2);

        const result = {
            date: date,
            total: totalSales
        };
        res.send(result);
    } catch (err) {
        console.error('Error fetching total sales:', err);
        res.status(500).send('Internal server error.');
    }
});


// GET transactions for a particular date
router.get('/by-date', async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);
        const transactions = await Transaction.find({ date: { $gte: startDate, $lte: endDate } });
        res.send(transactions);
    } catch (err) {
        console.error('Error fetching transactions by date:', err);
        res.status(500).send('Internal server error.');
    }
});


// Add new transaction
router.post('/new', async (req, res) => {
    try {
        const newTransaction = req.body;
        const transaction = await Transaction.create(newTransaction);
        res.sendStatus(200);
        // Optionally, perform other operations here
        Inventory.decrementInventory(transaction.products);
    } catch (err) {
        console.error('Error creating new transaction:', err);
        res.status(500).send('Internal server error.');
    }
});


// GET a single transaction
router.get('/:transactionId', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);
        if (!transaction) {
            return res.status(404).send('Transaction not found.');
        }
        res.send(transaction);
    } catch (err) {
        console.error('Error fetching transaction:', err);
        res.status(500).send('Internal server error.');
    }
});


module.exports = router;
