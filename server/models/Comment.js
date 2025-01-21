const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Exercise',
        required: [true, 'Please provide valid exersiceId!']
    },
    text: {
        type: String,
        trim: true,
        maxLength: 8000
    }
}, {timestamps: true})

module.exports = CommentSchema