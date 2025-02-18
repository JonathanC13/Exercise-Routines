const mongoose = require('mongoose')
const {CommentSchema, CommentModel} = require('./Comment')
const SetSchema = require('./Sets')

const ExerciseSchema = new mongoose.Schema({
    createdByUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user!']
    },
    sessionId: {
        type: mongoose.Types.ObjectId,
        ref: 'Session',
        required: [true, 'Please provide a session id!']
    },
    order: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: [true, 'Please provide an exercise name!'],
        trim: true,
        maxLength: [50, 'Please provide a name that is 50 or less characters!']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Please provide a name that is 500 or less characters!']
    }, 
    sets: {
        type: [SetSchema],
        default: []
    },
    muscleType: {
        type: String,
        default: "Uncategorized"
    },
    comments: {
        type: [CommentSchema],
        // type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true})

const AccountExerciseModel = mongoose.model('AccountExercise', ExerciseSchema)

module.exports = { ExerciseSchema, AccountExerciseModel}