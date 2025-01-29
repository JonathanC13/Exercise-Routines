const RoutineModel = require('../../models/Routine')
const {BadRequestError} = require('../../errors')

const routineDeleteQuery = (req, res, next) => {

    const {
        params: {routineId}
    } = req

    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }

    const query = RoutineModel.findByIdAndDelete(routineId)

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(query)

    req.routineId = routineId

    next()
}

module.exports = routineDeleteQuery