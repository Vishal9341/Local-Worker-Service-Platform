const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  profession: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'worker', 'admin'],
    default: 'user',
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  // Worker specific fields can be added above or kept in a separate model linked here
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
