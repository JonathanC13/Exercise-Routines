const RoutineModel = require('../models/Routine')
const {NotFoundError, BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

/**
 * Get all the Routines for the authenticated user. (user_id comes from prev middleware that decodes the JWT for the user_id and puts into req.userId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllRoutines = async(req, res, next) => {
    const {userId} = req.user
    const response = await RoutineModel.find({createdByUserId: userId})
    
    if (!userId) {
        throw new BadRequestError('Missing user id!')
    }

    res.status(StatusCodes.OK).json({response, count: response.length})
}

/**
 * Get the routine based on the id. (route param :routineId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getRoutine = async(req, res, next) => {
    const {routineId} = req.params

    if (!routineId) {
        throw new BadRequestError('Missing routine Id!')
    }

    const response = await RoutineModel.findById(routineId)

    if (!response) {
        throw new NotFoundError('That routine does not exist!')
    }

    res.status(StatusCodes.OK).json({response})
}

/**
 * Put request to create a Routine. (get user Id from req.userId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createRoutine = async(req, res, next) => {
    const {
        user: {userId: createdByUserId},
        body: {name}
    } = req

    if (name === '') {
        throw new BadRequestError('Please provide a routine name!')
    }
    
    const response = await RoutineModel.create({createdByUserId, ...req.body})

    res.status(StatusCodes.CREATED).json({response})
}

/**
 * Patch request to update a Routine. (route param :routineId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateRoutine = async(req, res, next) => {
    const {
        user: {userId: createdByUserId},
        params: { routineId },
        body: {name}
    } = req

    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }
    if (name === '') {
        throw new BadRequestError('Please provide a routine name!')
    }

    const optObj = {
        new: true,
        runValidators: true
    }

    const response = await RoutineModel.findOneAndUpdate({createdByUserId, _id: routineId}, req.body, optObj)

    if (!response) {
        throw new NotFoundError('Routine not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

/**
 * delete request to delete a Routine. (route param :routineId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteRoutine = async(req, res, next) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine }