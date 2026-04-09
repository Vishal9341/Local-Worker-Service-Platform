const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/user', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('Local Worker Platform API is running...');
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB Compass (Local MongoDB)');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Please ensure your local MongoDB service is running!');
  });
