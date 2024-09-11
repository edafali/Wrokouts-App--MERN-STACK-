require("dotenv").config();
const express = require("express");
const workoutsRoute = require("./routes/workouts");
const mongoose = require("mongoose");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());
// Routes
app.use("/api/workouts", workoutsRoute);
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for req
    app.listen(process.env.PORT, () => {
      console.log(`Db connected & Server turn on port`, process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
