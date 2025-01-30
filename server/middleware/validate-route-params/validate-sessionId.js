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

    if (!response) {
        throw new NotFoundError('Session not found!')
    }

    req.sessDoc = response

    next()
}

module.exports = validateSessionId