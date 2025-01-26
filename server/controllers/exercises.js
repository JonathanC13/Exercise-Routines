const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const SessionModel = require('../models/Session')

const getAllExercises = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { sessionId }
    } = req

    if (!sessionId) {
        throw new BadRequestError('Missing session id!')
    }

    const response = await SessionModel.findOne({createdByUserId, _id: sessionId}).select('exercises').sort('order updatedAt')

    if (!response) {
        throw new NotFoundError('Exercises not found!')
    }
    
    res.status(StatusCodes.OK).json({response: response.exercises, count: response.exercises.length})
}

const getExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { sessionId, exerciseId }
    } = req

    if (!sessionId) {
        throw new BadRequestError('Missing session id!')
    }
    if (!exerciseId) {
        throw new BadRequestError('Missing exercise id!')
    }

    const parent = await SessionModel.findOne({createdByUserId, _id: sessionId})
    const response = parent.exercises.id(exerciseId)

    res.status(StatusCodes.OK).json({response})
}

const createExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { sessionId }
    } = req

    if (!sessionId) {
        throw new BadRequestError('Missing session id!')
    }

    const parent = await SessionModel.findOne({createdByUserId, _id: sessionId})
    if (parent.exercises !== undefined) {
        parent.exercises.push(req.body)
    } else {
        parent.exercises = [req.body]
    }
    
    const response = await parent.save()

    res.status(StatusCodes.CREATED).json({response})
}

const updateExercise = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { sessionId, exerciseId }
    } = req
    
    const optObj = {
        new: true,
        runValidators: true
    }
    
    // const response = await SessionModel.findOneAndUpdate(
    //     {"createdByUserId": createdByUserId, "_id": sessionId, "exercises._id": exerciseId },
    //     {
    //         "$set": {
    //             "exercises.$": req.body
    //         }
    //     },
    //     optObj
    // )

    const parent = await SessionModel.findOne({"createdByUserId": createdByUserId, "_id": sessionId})

    if (!parent) {
        throw new NotFoundError('Session not found!')
    }
    
    for (let [key, val] of Object.entries(req.body)) {
        parent.exercises.id(exerciseId)[key] = val
    }
    const response = await parent.save()
    
    if (!response) {
        throw new NotFoundError('Exercise not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const deleteExercise = async(req, res) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllExercises, getExercise, createExercise, updateExercise, deleteExercise }