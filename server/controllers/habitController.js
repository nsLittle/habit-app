const { Habit } = require('../models/Habit');
const { User } = require('../models/User');

exports.createHabit = async (req, res) => {
  try {
    console.log('Incoming request to create habit for:', req.params.username);

    const { username } = req.params;
    const { habit } = req.body;
    console.log('Username:', username);

    if (!habit) {
      return res.status(400).json({ message: 'Habit is required' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newHabit = await Habit.create({
      habit,
      user: user._id,
    });

    res.status(201).json({
      habit_id: newHabit._id,
      message: 'Habit created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserHabits = async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Fetching habits for:', username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const habits = await Habit.find({ user: user._id });

    res.status(200).json({
      message: 'Habits retrieved successfully',
      habits,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateDetailedHabit = async (req, res) => {
  try {
    const { username, habit_id } = req.params;
    console.log('Updating Habit:', habit_id, 'for User:', username);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habit_id, user: user._id },
      req.body,
      { new: true }
    );
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({
      message: 'Detailed habit updated successfully',
      updatedHabit,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const { habit_id } = req.params;

    const completedHabit = await Habit.findByIdAndUpdate(
      habit_id,
      { completed: true },
      { new: true }
    );

    if (!completedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({
      message: 'Habit marked as complete successfully',
      completedHabit,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
