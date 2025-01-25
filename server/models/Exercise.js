const mongoose = require('mongoose')
const {CommentSchema} = require('./Comment')

const ExerciseSchema = new mongoose.Schema({
    order: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        trim: true,
        maxLength: [50, 'Please provide a name that is 50 or less characters!']
    },
    description: {
        type: String,
        trim: true,
        maxLength: 8000
    }, 
    sets: {
        type: Number,
        required: true,
        default: 1
    },
    repsOrDuration: {
        type: String,
        maxLength: 20
    },
    restTimeSeconds: {
        type: Number,
        default: 0
    },
    comments: [CommentSchema]
})

module.exports = ExerciseSchema