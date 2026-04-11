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
  // GeoJSON Point for proximity search (Mongo expects [lng, lat])
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    },
  },
  profession: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'worker', 'admin'],
    default: 'user',
  },
  // Worker availability (simple on/off + optional window)
  lastActive: {
    type: Date,
    default: Date.now,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  availableFrom: {
    type: Date,
  },
  availableTo: {
    type: Date,
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  // Worker specific fields can be added above or kept in a separate model linked here
}, { timestamps: true });

// Helps $near queries for matching workers
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);
