const express = require("express");
const {
  creatworkout,
  getAll,
  getSingleWrokout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();
// GET all workouts
router.get("/", getAll);
// GET single Workout
router.get("/:id", getSingleWrokout);
// POST a new workout
router.post("/", creatworkout);
// DELETE a workout
router.delete("/:id", deleteWorkout);
// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
