const SessionModel = require('../../models/Session')

const exerciseSingleDeleteQuery = async(req, res, next) => {

    const {
        params: { sessionId, exerciseId }
    } = req

    const query = SessionModel.findById(sessionId)
    query.exercises.id(exerciseId).remove()

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(query)

    req.exerciseIds = [exerciseId]

    next()
}

module.exports = exerciseSingleDeleteQuery