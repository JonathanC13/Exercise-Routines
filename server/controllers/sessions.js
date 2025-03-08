const SessionModel = require('../models/Session')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const applyOrder = (a, b) => {
    if (a.order - b.order === 0) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }
    return a.order - b.order
}

const getAllSessions = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {routineId}
    } = req

    const response = await SessionModel.find({routineId, createdByUserId}).sort('order updatedAt')

    if (!response) {
        throw new NotFoundError('No sessions found!')
    }

    response.sort((a, b) => {
        return applyOrder(a, b)
    })

    response.map((sess) => {
        sess.exercises.sort((a, b) => {
            return applyOrder(a, b)
        })
    })

    response.map((sess) => {
        sess.exercises.map((ex) => {
            ex.sets.sort((a, b) => {
                return applyOrder(a, b)
            })
        })
    })

    res.status(StatusCodes.OK).json({response, count: response.length})
}

const getSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: {routineId, sessionId}
    } = req
    
    if (!sessionId) {
        throw new BadRequestError('Missing session Id!')
    }
    
    const response = await SessionModel.findOne({_id: sessionId, routineId, createdByUserId})

    if (!response) {
        throw new NotFoundError('Session not found!')
    }

    response.exercises.sort((a, b) => {
        return applyOrder(a, b)
    })

    response.map((sess) => {
        sess.exercises.map((ex) => {
            ex.sets.sort((a, b) => {
                return applyOrder(a, b)
            })
        })
    })

    res.status(StatusCodes.OK).json({response})
}

const createSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { routineId },
        body: {name}
    } = req

    if (!name) {
        throw new BadRequestError('Please provide a session name!')
    }

    // ignore if the req body has the key exercises.
    const requestBody = {}
    for (let [key, val] of Object.entries(req.body)) {
        if (key !== 'exercises') {
            requestBody[key] = val
        }
    }
    
    const response = await SessionModel.create({routineId, createdByUserId, ...requestBody})

    res.status(StatusCodes.CREATED).json({response})
}

const updateSession = async(req, res) => {
    const {
        user: {userId: createdByUserId},
        params: { routineId, sessionId }
    } = req

    if (!sessionId) {
        throw new BadRequestError('Missing session Id!')
    }

    const optObj = {
        new: true,
        runValidators: true
    }

    // ignore if the req body has the key exercises.
    const requestBody = {}
    for (let [key, val] of Object.entries(req.body)) {
        if (key !== 'exercises') {
            requestBody[key] = val
        }
    }

    const response = await SessionModel.findOneAndUpdate({_id: sessionId, routineId, createdByUserId}, requestBody, optObj)

    if (!response) {
        throw new NotFoundError('Session not found!')
    }

    res.status(StatusCodes.OK).json({response})
}

const deleteSession = async(req, res) => {
    res.status(StatusCodes.OK).send()
}

module.exports = { getAllSessions, getSession, createSession, updateSession, deleteSession }