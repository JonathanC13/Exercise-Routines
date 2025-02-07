const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')
const mongoose = require('mongoose')

const sessionDeleteQuery = async(req, res, next) => {

    const {
        params: {sessionId},
        user: { userId: createdByUserId },
        routineId,
        session: session
    } = req

    if (!req.queries) {
        req.queries = []
    }

    const exerciseIds = []

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (routineId) {
        // delete coming from Routine delete
        req.queries.push(['session', SessionModel.deleteMany({routineId, createdByUserId}, {session: newSession})])
        // get all exercise ids
        const response = await SessionModel.find({routineId, createdByUserId})
        if (response) {
            response.forEach((obj) => {
                if (obj.exercises !== undefined) {
                    obj.exercises.forEach((exer) => {
                        exerciseIds.push(exer.id)
                    })
                }
            })
        }
    } else {
        // specific session to be deleted
        if (!sessionId) {
            throw new BadRequestError('Missing session Id!')
        }

        req.queries.push(['session', SessionModel.findOneAndDelete({_id: sessionId, createdByUserId}, {session: newSession})])

        const response = await SessionModel.findOne({_id: sessionId, createdByUserId})
        if (response && response.exercises !== undefined) {
            response.exercises.forEach((obj) => {
                exerciseIds.push(obj.id)
            })
        }

    }
    
    req.exerciseIds = exerciseIds
    req.session = newSession

    next()
}

module.exports = sessionDeleteQuery