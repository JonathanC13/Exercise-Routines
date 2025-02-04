const SessionModel = require('../../models/Session')
const {BadRequestError} = require('../../errors')

const sessionDeleteQuery = async(req, res, next) => {

    const {
        params: {sessionId},
        user: { userId: createdByUserId },
        routineId
    } = req

    let query = ''
    const exerciseIds = []

    if (routineId) {
        // delete coming from Routine delete
        query = SessionModel.deleteMany({routineId})
        // get all exercise ids
        const response = await SessionModel.find({routineId})
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

        query = SessionModel.findOneAndDelete({_id: sessionId, createdByUserId})

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

    next()
}

module.exports = sessionDeleteQuery