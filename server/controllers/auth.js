const { StatusCodes } = require('http-status-codes')
const UserModel = require('../models/User')
const { BadRequestError, UnauthenticatedError, ForbiddenError } = require('../errors/')
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide the required fields!')
    }

    // mongoose will exec default pre('save') that exec the validation checks, then run the any custom pre('save') function, then send the request to MongoDB
    const response = await UserModel.create({name, email, emailLowercase: email.toLowerCase(), password})  // in the model, it will call our pre('save') to encrypt the password

    res.status(StatusCodes.CREATED).json()
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message': 'Server error!'})
        return
    }

    // send refresh token in a httpOnly cookie
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true}) // for prod: secure: true
    const info = response.getUserInfo()
    res.status(StatusCodes.OK).json({user: {name: info.name, email: info.email, id: info.id , preferredTheme: info.preferredTheme}, token: token})
}

const refreshToken = async(req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) {
        // console.log('no jwt!')
        throw new UnauthenticatedError()
    }

    const refreshJWT = cookies.jwt
    // console.log(refreshJWT)
    // if refresh token valid, gets here
    const userDocument = await UserModel.findOne({refreshToken: refreshJWT})

    if (!userDocument) {
        // console.log('user not found!')
        throw new ForbiddenError()
    }

    // verify refresh token is valid
    const payload = jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET, 
        function(err, decoded) {
            if (err || userDocument.getId() !== decoded.userId) {
                // console.log(err)
                // console.log('refresh token expired!')
                throw new ForbiddenError()
            }
            return decoded
        }
    );

    // generate new access token
    const accessToken = userDocument.generateJWT()
    // console.log('generated new access token: ', accessToken)
    const info = userDocument.getUserInfo()
    res.status(StatusCodes.OK).json({user: {name: info.name, email: info.email, id: info.id , preferredTheme: info.preferredTheme}, token: accessToken})
    // res.status(StatusCodes.OK).json({token: accessToken})
}

const logout = async(req, res) => {
    // in the client side, also delete the access token. This will be in the memory; like in a Redux store or React Context

    const cookies = req.cookies

    if (!cookies?.jwt) {
        // console.log('no jwt')
        res.status(StatusCodes.NO_CONTENT).json()   // successful and 204 = no content
        return
    }

    const refreshJWT = cookies.jwt
    // if refresh token valid, gets here
    const userDocument = await UserModel.findOne({refreshToken: refreshJWT})

    if (!userDocument) {
        // console.log('no user')
        // have cookie, but no associated user. Need to remove the cookie
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true }) // for prod: secure: true // To clear the exact cookie, need to provide the same options as when it was created. // deprecated maxAge: 24 * 60 * 60 * 1000. Don't need to include
        res.status(StatusCodes.NO_CONTENT).json()   // successful and 204 = no content
        return
    }

    // remove refresh token from user
    userDocument.refreshToken = ''
    try {
        const saveResponse = await userDocument.save()
        // console.log(saveResponse)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) // for prod: secure: true        // deprecated maxAge: 24 * 60 * 60 * 1000. Don't need to include
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message': 'Server error!'})
        return
    }

    res.status(StatusCodes.NO_CONTENT).json()
}

const updateUserInfo = async(req, res) => {

    const {
        params: { userId }
    } = req

    const body = req.body

    if (!userId) {
        throw new BadRequestError('Missing user Id!')
    }

    const userDoc = await UserModel.findById(userId)

    if (!userDoc) {
        throw new NotFoundError('User not found!')
    }

    const restricted = new Set(['emailLowercase', 'password', 'createdAt', 'updatedAt', 'refreshToken'])

    try {
        for (let [key, val] of Object.entries(userDoc.toObject())) {
            if (restricted.has(key) || !Object.hasOwn(body, key)) {
                continue
            }

            userDoc[key] = body[key]

            if (key === 'email') {
                userDoc['emailLowercase'] = req.body['email'].toLowerCase()
            }
        }
        const response = await userDoc.save()

        res.status(StatusCodes.OK).json({user: {name: response.name, email: response.email, id: response.id , preferredTheme: response.preferredTheme}})

    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message': 'Server error!'})
        return
    }
}

const updatePassword = async(req, res) => {
    const {
        params: { userId }
    } = req

    const {
        currentPassword,
        newPassword
    } = req.body

    if (!userId) {
        throw new BadRequestError('Missing user Id!')
    }

    const userDoc = await UserModel.findById(userId)

    if (!userDoc) {
        throw new NotFoundError('User not found!')
    }

    const passwordCorrect = await response.validatePassword(password)
    if (!passwordCorrect) {
        throw new UnauthenticatedError('Incorrect current password!')
    }

    userDoc.replacePassword(newPassword)

    try {
        const response = await userDoc.save()
        res.status(StatusCodes.OK).json()
    } catch {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'message': 'Server error!'})
        return
    }
}

module.exports = { login, register, refreshToken, logout, updateUserInfo, updatePassword }