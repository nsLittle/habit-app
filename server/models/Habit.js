const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema(
    {
        habit: { type: String, required: false },
        description: { type: String, required: false },
        reminders: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true, default: 'weekly' },
        completed: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }, 
    { timestamps: true }
);

const Habit = mongoose.model('Habit', HabitSchema);
module.exports = { Habit, HabitSchema};