const mongoose = require('mongoose');
const User = require('../Backend/models/User');
require('dotenv').config({ path: '../Backend/.env' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: 'test1774787384754@example.com' });
  console.log('OTP for test user:', user.resetPasswordOTP);
  await mongoose.connection.close();
}

check();
