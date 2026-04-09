const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getWorkers, matchWorkers, updateMyAvailability } = require('../controllers/workerController');

router.get('/', getWorkers);
router.get('/match', matchWorkers);
router.patch('/me/availability', protect, updateMyAvailability);

module.exports = router;
