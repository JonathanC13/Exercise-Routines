const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')

const exerciseDeleteQuery = async(req, res, next) => {

    const {
        params: { sessionId, exerciseId },
        session: session
    } = req

    let query = ''
    const exerciseIds = []

    if (!exerciseId) {
        throw new BadRequestError('Missing exercise Id!')
    }

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (exerciseId) {
        const resp = await SessionModel.findByOne({_id: sessionId, createdByUserId})
        if (resp && resp.exercises !== undefined && resp.exercises.id(exerciseId)) {
            resp.exercises.id(exerciseId).deleteOne()
        }
        query = resp.save()
        exerciseIds.push(exerciseId)
    } else {
        const resp = await SessionModel.findByOne({_id: sessionId, createdByUserId})
        if (resp && resp.exercises !== undefined) {
            resp.exercises.forEach((ex) => {
                exerciseIds.push(ex._id)
            })
        }
        query = SessionModel.findOne({_id: sessionId, createdByUserId})
        query.exercises = []
        query.save()
    }
    
    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(['exercises', query])

    req.exerciseIds = exerciseIds
    req.session = newSession

    next()
}

module.exports = exerciseDeleteQuery