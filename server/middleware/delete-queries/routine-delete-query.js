const RoutineModel = require('../../models/Routine')
const {BadRequestError} = require('../../errors')

const routineDeleteQuery = (req, res, next) => {

    const {
        params: {routineId},
        user: { userId: createdByUserId }
    } = req

    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }

    const query = RoutineModel.findOneAndDelete({_id: routineId, createdByUserId})

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(['routine', query])

    req.routineId = routineId

    next()
}

module.exports = routineDeleteQuery