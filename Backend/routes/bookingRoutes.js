const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createBooking,
  listMyBookings,
  cancelBooking,
  completeBooking,
  acceptBooking,
} = require('../controllers/bookingController');

router.post('/', protect, createBooking);
router.get('/mine', protect, listMyBookings);
router.patch('/:id/cancel', protect, cancelBooking);
router.patch('/:id/accept', protect, acceptBooking);
router.patch('/:id/complete', protect, completeBooking);

module.exports = router;
 
