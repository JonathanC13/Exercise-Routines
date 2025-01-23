const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authorization = async(req, res, next) => {
    // request has the token in the header:
    // authentication: Bearer token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Not authenticated!')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // validate that the user decoded from the token exists in the DB
        const response = await UserModel.findById(payload.userId).select('-password')
        
        if (!response) {
            throw new Error()
        }

        // attach the user to the job routes
        req.user = {userId: payload.userId, name:payload.name}
    } catch (err) {
        throw new UnauthenticatedError('Not authenticated!')
    }

    next()
}

module.exports = authorization