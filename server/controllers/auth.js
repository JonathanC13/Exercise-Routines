const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/User')

const register = (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.send('missing inputs')// TODO custom errors
    }

    // mongoose will exec default pre('save') that exec the validation checks, then run the any custom pre('save') function, then send the request to MongoDB
    const response = UserModel.create({name, email, password})  // in the model, it will call our pre('save') to encrypt the password

    const token = UserModel.generateJWT()

    res.status(StatusCodes.CREATED).json({user: {name: response.getName()}, token: token})
}

const login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({msg: 'bad request'}) // TODO custom errors
    }

    // try to find the account


    const token = UserModel.generateJWT()
    res.status(StatusCodes.OK).json({user: {name: response.getName()}, token: token})
}



module.exports = { login, register }