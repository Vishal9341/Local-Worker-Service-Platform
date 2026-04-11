const mongoose = require('mongoose');
const User = require('./models/User.js');

async function test() {
  await mongoose.connect('mongodb://127.0.0.1:27017/local_worker_platform');
  const worker = await User.findOne({ role: 'worker' });
  console.log("Found worker:", worker);
  const user = await User.findOne({ role: 'user' });
  console.log("Found user:", user);
  process.exit();
}
test();
