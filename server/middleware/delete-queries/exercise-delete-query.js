const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')
const mongoose = require('mongoose')

const exerciseDeleteQuery = async(req, res, next) => {

    const {
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId },
        session: session
    } = req

    if (!req.queries) {
        req.queries = []
    }

    const exerciseIds = []

    if (!exerciseId) {
        throw new BadRequestError('Missing exercise Id!')
    }

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (exerciseId) {
        // deleting specific exercise
        const resp = await SessionModel.findOne({_id: sessionId, createdByUserId}).session(newSession)
        if (resp && resp.exercises !== undefined && resp.exercises.id(exerciseId)) {
            resp.exercises.id(exerciseId).deleteOne()
        }
        req.queries.push(['exercises', resp.save()])
        exerciseIds.push(exerciseId)
    } else {
        const resp = await SessionModel.findOne({_id: sessionId, createdByUserId})
        if (resp && resp.exercises !== undefined) {
            resp.exercises.forEach((ex) => {
                exerciseIds.push(ex.id)
            })
        }
        const sess = SessionModel.findOne({_id: sessionId, createdByUserId}).session(newSession)
        sess.exercises = []
        req.queries.push(['exercises', sess.save()])
    }
    
    req.exerciseIds = exerciseIds
    req.session = newSession

    next()
}

module.exports = exerciseDeleteQuery