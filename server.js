const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Exercise } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'))
})

//creating a workout
app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
    .then (dbWorkout => {
      console.log(dbWorkout)
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    })
});

//getting a workout
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .populate("exercises")
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err)
  })
});

//adding an exercise
app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body)
  console.log(params.id)
 
  db.Exercise.create(body)
  .then(({ params }) => db.Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true }))
  .then(dbWorkout => {
    console.log(dbWorkout)
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err)
  })
})

//getting a workout range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate( [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ]).then(dbWorkouts => {
    res.json(dbWorkouts)
  }).catch(err => {
    res.json(err)
  })
})

// server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  