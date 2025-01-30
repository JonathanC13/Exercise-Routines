const RoutineModel = require('../../models/Routine')
const { BadRequestError, NotFoundError } = require('../../errors')

const validateRoutineId = async(req, res, next) => {
    const {
        user: {userId: createdByUserId},
        params: {routineId}
    } = req
    
    if (!routineId) {
        throw new BadRequestError('Missing routine id!')
    }

    const response = await RoutineModel.findOne({'_id': routineId, createdByUserId})

    if (!response) {
        throw new NotFoundError('Routine not found!')
    }

    next()
}

module.exports = validateRoutineId