const SessionModel = require('../models/Session')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllSessions = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {routineId}
    } = req
    
    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }

    const response = await SessionModel.find({routineId, createdByUserId}).sort('order updatedAt')

    res.status(StatusCodes.OK).json({response, count: response.length})
}

const getSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {routineId, sessionId}
    } = req
    
    if (!routineId) {
        throw new BadRequestError('Missing routine Id!')
    }
    if (!sessionId) {
        throw new BadRequestError('Missing session Id!')
    }
    
    const response = await SessionModel.findOne({_id: sessionId, routineId, createdByUserId})

    if (!response) {
        throw new NotFoundError('Session not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const createSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { routineId }
    } = req
    
    if (!routineId) {
        throw new BadRequestError('Missing routine Id')
    }
    
    const response = await SessionModel.create({routineId, createdByUserId, ...req.body})

    res.status(StatusCodes.CREATED).json({response})
}

const updateSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { routineId, sessionId }
    } = req
    
    if (!routineId) {
        throw new BadRequestError('Missing routine Id!')
    }
    if (!sessionId) {
        throw new BadRequestError('Missing session Id!')
    }

    const optObj = {
        new: true,
        runValidators: true
    }

    const response = await SessionModel.findOneAndUpdate({_id: sessionId, routineId, createdByUserId}, req.body, optObj)

    if (!response) {
        throw new NotFoundError('Session not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const deleteSession = async(req, res) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllSessions, getSession, createSession, updateSession, deleteSession }