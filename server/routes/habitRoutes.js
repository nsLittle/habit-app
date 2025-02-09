const express = require("express");
const {
  createHabit,
  getUserHabits,
  updateDetailedHabit,
  completeHabit,
} = require("../controllers/habitController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/:username", protect, createHabit);
router.get("/:username", protect, getUserHabits);
router.get("/:username/:habit_id/detailed-habit", protect, updateDetailedHabit);
router.patch(
  "/:username/:habit_id/detailed-habit",
  protect,
  updateDetailedHabit
);
router.patch("/:username/:habit_id/complete", protect, completeHabit);

module.exports = router;
