const SessionModel = require('../../models/Session')

const sessionDeleteQuery = async(req, res, next) => {

    const {
        params: {sessionId},
        routineId
    } = req

    let query = ''
    const exerciseIds = []

    if (sessionId) {
        query = SessionModel.findByIdAndDelete(sessionId)

        const response = await SessionModel.findById(sessionId).select('exercises')
        response['exercises'].forEach((obj) => {
            exerciseIds.push(obj._id)
        })

    } else {
        // delete coming from Routine delete
        query = SessionModel.deleteMany({routineId})
        // get all exercise ids
        const response = await SessionModel.find({routineId})
        response.forEach((obj) => {
            response['exercises'].forEach((obj) => {
                exerciseIds.push(obj._id)
            })
        })
    }

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(query)

    req.exerciseIds = exerciseIds

    next()
}

module.exports = sessionDeleteQuery