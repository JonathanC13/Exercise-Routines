const mongoose = require('mongoose')

const RoutineSchema = new mongoose.Schema({
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
        required: [true, 'Please provide a routine name!'],
        trim: true,
        maxLength: [50, 'Please provide a name that is 50 or less characters!']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Please provide a description that is less than 500 characters!']
    }
}, { timestamps: true })

module.exports = mongoose.model('Routine', RoutineSchema)