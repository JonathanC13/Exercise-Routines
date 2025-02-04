const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')

const exerciseDeleteQuery = async(req, res, next) => {

    const {
        params: { sessionId, exerciseId }
    } = req

    let query = ''
    const exerciseIds = []

    if (!exerciseId) {
        throw new BadRequestError('Missing exercise Id!')
    }

    if (exerciseId) {
        const resp = await SessionModel.findById(sessionId)
        if (resp && resp.exercises !== undefined && resp.exercises.id(exerciseId)) {
            resp.exercises.id(exerciseId).deleteOne()
        }
        query = resp.save()
        exerciseIds.push(exerciseId)
    } else {
        const resp = await SessionModel.findById(sessionId)
        if (resp && resp.exercises !== undefined) {
            resp.exercises.forEach((ex) => {
                exerciseIds.push(ex._id)
            })
        }
        query = SessionModel.findById(sessionId)
        query.exercises = []
        query.save()
    }
    
    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(['exercises', query])

    req.exerciseIds = exerciseIds

    next()
}

module.exports = exerciseDeleteQuery