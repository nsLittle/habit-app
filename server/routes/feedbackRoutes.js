const express = require('express');
const { submitFeedback, getFeedbackForHabit } = require('../controllers/feedbackController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, submitFeedback);
router.get('/:habit_id', protect, getFeedbackForHabit);

module.exports = router;