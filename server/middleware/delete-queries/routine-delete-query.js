const RoutineModel = require('../../models/Routine')

const routineDeleteQuery = (req, res, next) => {

    const {
        params: {routineId}
    } = req

    const query = RoutineModel.findByIdAndDelete(routineId)

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(query)

    req.routineId = routineId

    next()
}

module.exports = routineDeleteQuery