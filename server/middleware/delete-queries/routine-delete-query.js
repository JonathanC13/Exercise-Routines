const RoutineModel = require('../../models/Routine')
const {BadRequestError} = require('../../errors')
const mongoose = require('mongoose')

const routineDeleteQuery = async(req, res, next) => {

    const {
        params: {routineId},
        user: { userId: createdByUserId }
    } = req

    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }

    // Start a session
    const session = await mongoose.startSession();

    const query = RoutineModel.findOneAndDelete({_id: routineId, createdByUserId}, {session: session})

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(['routine', query])

    req.routineId = routineId
    // pass along session
    req.session = session

    next()
}

module.exports = routineDeleteQuery