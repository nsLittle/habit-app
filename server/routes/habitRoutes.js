const express = require('express');
const { createHabit, updateDetailedHabit } = require('../controllers/habitController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createHabit);
router.patch('/:habit_id/detailed-habit', protect, updateDetailedHabit);

module.exports = router;
