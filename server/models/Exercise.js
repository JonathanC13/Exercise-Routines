const mongoose = require('mongoose')
const {CommentSchema, CommentModel} = require('./Comment')

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
        default: 1
    },
    repsOrDuration: {
        type: String,
        maxLength: 20,
        default: 0
    },
    restTimeSeconds: {
        type: Number,
        default: 0
    },
    comments: {
        type: [CommentSchema],
        // type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        default: []
    }
    
}, {timestamps: true})

module.exports = ExerciseSchema