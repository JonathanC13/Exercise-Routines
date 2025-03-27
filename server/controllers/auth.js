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

    res.status(StatusCodes.CREATED)
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
    // token for Access Token, refreshToken for refresh token
    const token = response.generateJWT()
    const refreshToken = response.generateRefreshJWT()

    // update user document to save the new Refresh token. In Mongoose, once you have the document it can be updated with save()
    try {
        response.refreshToken = refreshToken
        const saveResponse = response.save()
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message': 'Server error!'})
        return
    }

    // send refresh token in a httpOnly cookie
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.status(StatusCodes.OK).json({user: {name: response.getName(), email: response.getEmail(), id: response.getId()}, token: token})
}



module.exports = { login, register }