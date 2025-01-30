const User = require('../models/User'); 
const TeamMember = require('../models/TeamMember');

exports.addTeamMember = async (req, res) => {
  try {
    const { username } = req.params;
    const { firstName, lastName, email, habit, role } = req.body;

    console.log(`Adding team member for user: ${username}`);

    if (!firstName || !habit || !role) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const user = await User.findOne({ username });

    console.log('User Found:', username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${user._id}`);

    const newTeamMember = await TeamMember.create({
      firstName,
      lastName,
      email,
      habit,
      role,
      user: user._id,
    });

    console.log('Team Member Created:', newTeamMember);

    res.status(201).json({
      message: 'Team member added successfully',
      teamMember: newTeamMember,
    });
  } catch (error) {
    console.error('Error adding team member:', error.message);
    res.status(500).json({ error: 'Failed to add team member' });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Fetching team members for:', username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const teamMembers = await TeamMember.find({ user: user._id });

    res.status(200).json({
      message: 'Team members retrieved successfully',
      teamMembers,
    });
  } catch (error) {
    console.error('Error retrieving team members:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const { teamMember_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teamMember_id)) {
      return res.status(400).json({ message: 'Invalid Team Member ID' });
    }

    const teamMember = await TeamMember.findById(teamMember_id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== teamMember.owner.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this team member' });
    }

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(teamMember_id, req.body, { new: true });

    if (!updatedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({
      message: 'Team member updated successfully',
      teamMember: updatedTeamMember,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const { teamMember_id } = req.params;

    const deletedTeamMember = await TeamMember.findByIdAndDelete(teamMember_id);

    if (!deletedTeamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};