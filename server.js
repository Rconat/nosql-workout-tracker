const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const Workout = require("./model");
const { db } = require("./model");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'))
})

//creating a workout
app.post("api/workout", ({body}, res) => {
  Workout.create(body)
    .then (dbWorkout => {
      console.log(dbWorkout)
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    })
})

//getting a workout

//adding an exercise


// server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  