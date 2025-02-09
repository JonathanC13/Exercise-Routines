const {StatusCodes} = require('http-status-codes')
const {AccountExerciseModel} = require('../models/Exercise')
const {NotFoundError, BadRequestError} = require('../errors')

const getAllAccountExercises = async(req, res) => {

    const {
        user: {userId: createdByUserId}
    } = req

    const response = await AccountExerciseModel.find({createdByUserId})

    if (!response) {
        throw new NotFoundError('Account exercises not found!')
    }

    res.status(StatusCodes.OK).json({response, count: response.length})
}

const getAccountExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {accountExerciseId}
    } = req

    if (!accountExerciseId) {
        throw new BadRequestError('Missing accountExerciseId!')
    }

    const response = await AccountExerciseModel.findOne({_id: accountExerciseId, createdByUserId})

    if (!response || response.length === 0) {
        throw new NotFoundError('Account exercise not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const createAccountExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId}
    } = req

    // for now it doesn't save the sub document array of sets or comments
    const requestBody = {}
    for (let [key, val] of Object.entries(req.body)) {
        if (key !== 'sets' && key !== 'comments') {
            requestBody[key] = val
        }
    }

    const response = await AccountExerciseModel.create({createdByUserId, ...requestBody})

    if (!response) {
        throw new BadRequestError('Account exercise could not be created!')
    }

    res.status(StatusCodes.CREATED).json({response})
}

const updateAccountExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {accountExerciseId}
    } = req

    if (!accountExerciseId) {
        throw new BadRequestError('Missing accountExerciseId!')
    }

    const optObj = {
        runValidators: true,
        new: true
    }

    // for now it doesn't save the sub document array of sets or comments
    const requestBody = {}
    for (let [key, val] of Object.entries(req.body)) {
        if (key !== 'sets' && key !== 'comments') {
            requestBody[key] = val
        }
    }

    const response = await AccountExerciseModel.findOneAndUpdate({_id: accountExerciseId, createdByUserId}, {...requestBody}, optObj)

    if (!response) {
        throw new NotFoundError('Account exercise not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const deleteAccountExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {accountExerciseId}
    } = req

    if (!accountExerciseId) {
        throw new BadRequestError('Missing accountExerciseId!')
    }

    const response = await AccountExerciseModel.findOneAndDelete({_id: accountExerciseId, createdByUserId})

    res.status(StatusCodes.OK).send()
}

module.exports = { getAllAccountExercises, createAccountExercise, getAccountExercise, updateAccountExercise, deleteAccountExercise }