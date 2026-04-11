const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    profession: {
      type: String,
    },
    // Snapshot of where service is needed
    address: {
      type: String,
    },
    userLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
    scheduledStart: {
      type: Date,
    },
    scheduledEnd: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    cancelledBy: {
      type: String,
      enum: ['user', 'worker'],
    },
    cancelReason: {
      type: String,
    },
    cancelledAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ userLocation: '2dsphere' });
bookingSchema.index({ worker: 1, status: 1, createdAt: -1 });
bookingSchema.index({ user: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);

