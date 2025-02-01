const SessionModel = require('../../models/Session')
const {BadRequestError, NotFoundError} = require('../../errors')

const validateExerciseId = async(req, res, next) => {

    const { 
        user: { userId: createdByUserId },
        params: { sessionId, exerciseId },
        sessDoc: sessDoc
    } = req

    if (!exerciseId) {
        throw new BadRequestError('Missing exercise id!')
    }
    
    const exerciseDoc = sessDoc.exercises.id(exerciseId)

    if (!exerciseDoc || exerciseDoc.length !== 1) {
        throw new NotFoundError('Err: Exercise not found!')
    }

    req.exerciseDoc = exerciseDoc[0]

    next()
}

module.exports = validateExerciseId