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

    query = SessionModel.findById(sessionId)

    if (exerciseId) {
        query.exercises.id(exerciseId).remove()
        exerciseIds = [exerciseId]
    } else {
        const resp = await SessionModel.findById(sessionId)
        resp.exercises.forEach((ex) => {
            exerciseIds.push(ex._id)
        })

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