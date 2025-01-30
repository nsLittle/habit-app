const express = require('express');
const { 
    addTeamMember,
    getTeamMembers,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamMemberController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, addTeamMember);
router.post('/:username', protect, addTeamMember);
router.get('/', protect, getTeamMembers);
router.put('/:teamMember_id', protect, updateTeamMember);
router.delete('/:teamMember_id', protect, deleteTeamMember);

module.exports = router;