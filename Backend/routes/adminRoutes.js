const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, isAdmin, getDashboardStats);
router.get('/users', protect, isAdmin, getAllUsers);

module.exports = router;
