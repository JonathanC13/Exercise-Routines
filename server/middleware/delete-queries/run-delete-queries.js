const mongoose = require('mongoose')
const { BadRequestError } = require('../../errors')
const RoutineModel = require('../../models/Routine')
const SessionModel = require('../../models/Session')
const { CommentModel:Comment } = require('../../models/Comment')

const runDeleteQueries = async(req, res, next) => {
    const {
        queries
    } = req

    if (!queries) {
        throw new BadRequestError('Something has gone wrong!')
    }

    // Start a session
    const session = await mongoose.startSession();

    try {
        // Start a transaction
        session.startTransaction();

        // Transaction queries
        for (let i = 0; i < queries.length; i ++) {
            const response = await queries[i][1]
            
            if (!response) {
                throw new BadRequestError('Cascade delete error: ' + queries[i][0] + ".")
            }
        }

        // Commit the transaction
        await session.commitTransaction();
    } catch (err) {
        throw new BadRequestError('Something has gone wrong! ' + err.message)
    } finally {
        session.endSession()
    }

    next()
}

module.exports = runDeleteQueries