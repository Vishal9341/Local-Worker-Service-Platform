const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // load .env FIRST

const app = express();

// 🔥 Use Render PORT or local
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('Local Worker Platform API is running...');
});

// 🔥 DEBUG (temporary)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB Atlas Connected Successfully');

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });