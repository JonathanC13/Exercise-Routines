const mongoose = require('mongoose')

const SetSchema = new mongoose.Schema({
    order: {
        type: Number,
        default: 0
    },
    weight: {
        type: String
    },
    repsOrDuration: {
        type: String,
        maxLength: 20,
        default: 1
    },
    restTimeSeconds: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = SetSchema