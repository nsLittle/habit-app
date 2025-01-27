const express = require('express');
const { addTeamMember } = require('../controllers/teamMemberController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, addTeamMember);

module.exports = router;
