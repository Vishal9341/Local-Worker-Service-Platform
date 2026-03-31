const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: 'test1774787384754@example.com' });
  console.log('OTP_RESULT:' + user.resetPasswordOTP);
  await mongoose.connection.close();
}

check();
