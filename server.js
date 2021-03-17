const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// connecting to mongoDB via heroku
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'))
})

//creating a workout
app.post("/api/workouts", ({body}, res) => {

  const workout = new db.Workout(body)
  db.Workout.create(workout)
    .then (dbWorkouts => {
      // console.log(dbWorkout)
      res.json(dbWorkouts)
    })
    .catch(err => {
      res.json(err)
    })
});

//getting a workout
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts)
  })
  .catch(err => {
    res.json(err)
  })
});

//adding an exercise
app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
  .then(dbWorkout => {
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
        totalDuration: { $sum: "$exercises.duration" },
        totalDistance: { $sum: "$exercises.distance" }
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
  