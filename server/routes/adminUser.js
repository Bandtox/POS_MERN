const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/admin');

const createAdminUser = async () => {
    try {
        const email = 'admin@pos.com';
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Admin user already exists');
            return;
        }

        const password = await bcrypt.hash('admin', 10);  // Change 'harsh' to your desired password
        const adminUser = new User({
            name: 'Admin',
            email,
            password,
            country: 'India',
            role: 'admin',
        });

        await adminUser.save();
        console.log('Admin user created');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

createAdminUser();
