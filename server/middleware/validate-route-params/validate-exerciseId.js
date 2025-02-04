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
    
    if (!exerciseDoc) {
        throw new NotFoundError('Err: Exercise not found!')
    }
    
    req.exerciseDoc = exerciseDoc

    next()
}

module.exports = validateExerciseId