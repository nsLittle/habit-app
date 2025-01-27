const { Habit } = require('../models/Habit');

exports.createHabit = async (req, res) => {
  try {
    const { habit } = req.body;

    if (!habit) {
      return res.status(400).json({ message: 'Habit is required' });
    }

    const newHabit = await Habit.create({
      habit,
      user: req.user.id,
    });

    res.status(201).json({
      habit_id: newHabit._id,
      message: 'Habit created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDetailedHabit = async (req, res) => {
  try {
    const { habit_id } = req.params;
    const updatedHabit = await Habit.findByIdAndUpdate(habit_id, req.body, { new: true });
    res.status(200).json({ message: 'Detailed habit updated successfully', updatedHabit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
