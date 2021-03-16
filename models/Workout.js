const mongoose = require("mongoose");

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'type of workout is required'
            },
            name: {
                type: String,
                trim: true,
                required: 'name of workout is required'
            },
            weight: {
                type: Number,
                trim: true,
                required: 'weight is required'
            },
            sets: {
                type: Number,
                trim: true,
                required: 'number of sets is required'
            },
            reps: {
                type: Number,
                trim: true,
                required: 'number of reps is required'
            },
            duration: {
                type: Number,
                required: 'duration of workout is required'
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;