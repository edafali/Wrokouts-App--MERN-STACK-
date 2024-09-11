const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getAll = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};
// get a single workout
const getSingleWrokout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No workout found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ err: "No woukout found" });
  }
  res.status(200).json(workout);
};
// create a new workout
const creatworkout = async (req, res) => {
  const { title, reps, load } = req.body;
  // add data to database
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "workout not found" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    res.status(400).json({ msg: "workout not found" });
  }
  res.status(200).json(workout);
};
// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ msg: "workout not found" });
  }
  const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    res.status(404).json({ msg: "workout not found" });
  }
  res.status(200).json({ msg: "workout has been updated" });
};
module.exports = {
  creatworkout,
  getAll,
  getSingleWrokout,
  deleteWorkout,
  updateWorkout,
};
