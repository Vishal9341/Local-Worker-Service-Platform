const express = require('express');
const router = express.Router();
const { register, login, getMe, deleteMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.delete('/delete-me', protect, deleteMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
