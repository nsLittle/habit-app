const { User } = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate('habits teamMember');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
