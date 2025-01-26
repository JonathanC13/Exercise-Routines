const mongoose = require('mongoose')
const { BadRequestError } = require('../../errors')

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
            await queries[i]
        }

        // Commit the transaction
        await session.commitTransaction();
    } catch (err) {
        throw new BadRequestError('Something has gone wrong!')
    } finally {
        session.endSession()
    }

    next()
}

module.exports = runDeleteQueries