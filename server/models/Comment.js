const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    createdByUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user!']
    },
    exerciseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Exercise',
        required: [true, 'Please provide valid exerciseId!']
    },
    text: {
        type: String,
        trim: true,
        maxLength: 8000
    }
}, {timestamps: true})

// const CommentSubSchema = new mongoose.Schema({
//     commentId: {
//         type: mongoose.Types.ObjectId,
//         ref: 'Comment',
//         required: [true, 'Please provide valid commentId for collection Comment!']
//     },
//     text: {
//         type: String,
//         trim: true,
//         maxLength: 8000
//     }
// }, {timestamps: true})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = { CommentSchema, CommentModel }