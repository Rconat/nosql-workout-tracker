const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'name of workout is required'
    },
    type: {
        type: String,
        trim: true,
        required: 'type of workout is required'
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
    },
    cardio: {
        type: Boolean,
        default: false,
    },
    distance: {
        type: Number,
    }
});

const Workout = model('Workout', WorkoutSchema);

module.exports = Workout;