const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('admin123', salt);

    // Check if admin already exists
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (admin) {
        console.log('Admin user already exists!');
    } else {
        admin = await User.create({
            name: 'System Admin',
            email: 'admin@example.com',
            password,
            role: 'admin'
        });
        console.log('Admin user created successfully: admin@example.com / admin123');
    }
    
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

createAdmin();
