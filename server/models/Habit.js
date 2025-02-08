const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema(
  {
    habit: { type: String, required: true },
    description: { type: String, required: false },
    reminders: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
      default: "weekly",
    },
    feedbackCadence: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    completed: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    reviewDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", HabitSchema);
module.exports = { Habit, HabitSchema };
