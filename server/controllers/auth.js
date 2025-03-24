const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors/')

const register = async(req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide the required fields!')
    }

    // mongoose will exec default pre('save') that exec the validation checks, then run the any custom pre('save') function, then send the request to MongoDB
    const response = await UserModel.create({name, email, emailLowercase: email.toLowerCase(), password})  // in the model, it will call our pre('save') to encrypt the password

    const token = response.generateJWT()

    res.status(StatusCodes.CREATED).json({user: {name: response.getName(), email: response.getEmail(), id: response.getId()}, token: token})
}

const login = async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide the required fields!')
    }

    // try to find the account
    const response = await UserModel.findOne({emailLowercase: email.toLowerCase()})

    if (!response) {
        throw new UnauthenticatedError('Invalid credentials!')
    }

    const passwordCorrect = await response.validatePassword(password)

    if (!passwordCorrect) {
        throw new UnauthenticatedError('Invalid credentials!')
    }

    const token = response.generateJWT()
    res.status(StatusCodes.OK).json({user: {name: response.getName(), email: response.getEmail(), id: response.getId()}, token: token})
}



module.exports = { login, register }