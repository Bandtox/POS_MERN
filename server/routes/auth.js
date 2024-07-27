const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware'); 
const router = express.Router();

// mongoose.connect('mongodb://localhost:27017/user', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

router.post('/register', async (req, res) => {
    const { name, email, password, country } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, country, role: 'user' });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send('Email already exists');
        } else {
            res.status(500).send(err.message);
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            await mongoose.disconnect();
            await mongoose.connect('mongodb://localhost:27017/admin');
            user = await User.findOne({ email });
        }

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret');
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/user');
    }
});

// auth.js
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;
