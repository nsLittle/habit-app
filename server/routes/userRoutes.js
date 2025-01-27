const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:username', protect, getUserProfile);
router.patch('/:username', protect, updateUserProfile);

module.exports = router;