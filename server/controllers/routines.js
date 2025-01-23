const RoutineModel = require('../models/Routine')
const {NotFoundError} = require('../errors')
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
    
    if (!response) {
        throw new NotFoundError('Routines not found!')
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
    res.send(`route param ${routineId}`)
}

/**
 * Put request to create a Routine. (get user Id from req.userId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createRoutine = async(req, res, next) => {
    const createdBy = req.userId
    res.json({createdBy, ...req.body()})
}

/**
 * Patch request to update a Routine. (route param :routineId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateRoutine = async(req, res, next) => {
    const { routineId } = req.params
    res.json({routineId, ...req.body()})
}

/**
 * delete request to delete a Routine. (route param :routineId)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteRoutine = async(req, res, next) => {
    const { routineId } = req.params
    res.json({routineId})
}

module.exports = { getAllRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine }