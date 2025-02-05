const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')

const sessionDeleteQuery = async(req, res, next) => {

    const {
        params: {sessionId},
        user: { userId: createdByUserId },
        routineId,
        session: session
    } = req

    let query = ''
    const exerciseIds = []

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (routineId) {
        // delete coming from Routine delete
        query = SessionModel.deleteMany({routineId, createdByUserId}, {session: newSession})
        // get all exercise ids
        const response = await SessionModel.find({routineId, createdByUserId})
        response.forEach((obj) => {
            response['exercises'].forEach((obj) => {
                exerciseIds.push(obj._id)
            })
        })
    } else {
        // specific session to be delete
        if (!sessionId) {
            throw new BadRequestError('Missing session Id!')
        }

        query = SessionModel.findOneAndDelete({_id: sessionId, createdByUserId}, {session: newSession})

        const response = await SessionModel.findOne({_id: sessionId, createdByUserId})
        if (response && response.exercises !== undefined) {
            response.exercises.forEach((obj) => {
                exerciseIds.push(obj._id)
            })
        }

    }

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(['session', query])

    req.exerciseIds = exerciseIds
    req.session = newSession

    next()
}

module.exports = sessionDeleteQuery