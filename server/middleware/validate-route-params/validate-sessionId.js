const SessionModel = require('../../models/Session')
const {BadRequestError, NotFoundError} = require('../../errors')

const validateSessionId = async(req, res, next) => {
    const {
        user: {userId: createdByUserId},
        params: {sessionId}
    } = req

    if (!sessionId) {
        throw new BadRequestError('Missing session id!')
    }

    const response = await SessionModel.find({'_id': sessionId, createdByUserId})

    if (!response || response.length !== 1) {
        throw new NotFoundError('Err: Session not found!')
    }
    
    req.sessDoc = response[0]

    next()
}

module.exports = validateSessionId