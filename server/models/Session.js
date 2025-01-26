const mongoose = require('mongoose')
const ExerciseSchema = require('./Exercise')

const SessionSchema = new mongoose.Schema({
    routineId: {
        type: mongoose.Types.ObjectId,
        ref: 'Routine',
        required: [true, 'Please provide a valid RoutineId!']
    },
    createdByUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user!']
    },
    order: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name!'],
        maxLength: [50, 'Please provide a name that is 50 or less characters!']
    },
    description: {
        type: String,
        trim: true,
        maxLength: 8000
    },
    exercises: {
        type: [ExerciseSchema],
        default: []
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Session', SessionSchema)