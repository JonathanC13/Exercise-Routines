const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        trim: true,
        minLength: [6, 'Please provide a password that is 6 or more characters']
    },
    lastRoutineAccessed: {
        type: mongoose.Types.ObjectId,
        ref: 'Routine',
        default: null
    }
}, { timestamps: true } )

UserSchema.methods.getName = function() {
    return this.name
}

UserSchema.methods.generateJWT = function() {
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next()
})

UserSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)