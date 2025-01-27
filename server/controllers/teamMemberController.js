const { TeamMember } = require('../models/TeamMember');

exports.addTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body);
    res.status(201).json({ message: 'Team member added successfully', teamMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
