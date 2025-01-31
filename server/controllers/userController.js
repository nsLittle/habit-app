const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Username: ', username);

    const user = await User.findOne({ username }).populate('habits teamMember');
    console.log('user:', user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    console.log("Updating Profile for:", username);
    console.log("Update Data:", updates);

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updates,
      { new: true, runValidators: true }
    );
    console.log('Updated User: ', updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const requester = req.user;

    console.log("Requester:", requester);
    console.log("Requested username for deletion:", username);

    if (!requester) {
      return res.status(403).json({ message: "Unauthorized: No requester info" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (requester.username === username) {
      user.isDeleted = true;
      await user.save();
      return res.status(200).json({ message: "User deleted (soft delete)" });
    }

    if (requester.role === "admin") {
      await User.deleteOne({ username });
      return res.status(200).json({ message: "User deleted permanently" });
    }

    return res.status(403).json({ message: "Unauthorized to delete this user" });

  } catch (error) {
    console.error("Error in deleteUserProfile:", error.message);
    res.status(400).json({ error: error.message });
  }
};