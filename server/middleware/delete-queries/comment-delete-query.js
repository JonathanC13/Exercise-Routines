const SessionModel = require('../../models/Session')
const { CommentModel } = require('../../models/Comment')
const {BadRequestError} = require('../../errors')
const mongoose = require('mongoose')

const commentDeleteQuery = async(req, res, next) => {
    const {
        params: {sessionId, exerciseId, commentId},
        user: { userId: createdByUserId },
        exerciseIds,
        session: session
    } = req

    if (!req.queries) {
        req.queries = []
    }

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (exerciseIds) {
        // if here, it means the entire exercise is being deleted so just handle Comment collection here
        req.queries.push(['comment', CommentModel.deleteMany({createdByUserId, exerciseId: [...exerciseIds]}, {session: newSession})])
    } else {
        if (!commentId) {
            throw new BadRequestError('Missing comment Id!')
        }
        
        // if specific Id, must remove from exercise sub doc array and in Comment collection
        // 1. from sub doc array
        const subdocQ = await SessionModel.findOne({_id: sessionId, createdByUserId}).session(newSession)

        // must get all comments that belong to this exercise Id since need to maintain 3 most recently created in the array.
        const allComments = await CommentModel.find({exerciseId, createdByUserId})

        if (subdocQ) {

            const threeRecentComments = allComments.filter((comment) => {
                if (comment.id !== commentId) {
                    return comment
                }
            }).sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)}).slice(0, 3)

            subdocQ.exercises.id(exerciseId).comments = threeRecentComments
            req.queries.push(['comment', subdocQ.save()])
        }

        // 2. from collection comments
        req.queries.push(['comment', CommentModel.findOneAndDelete({_id: commentId, createdByUserId}, {session: newSession})])
    }

    req.session = newSession

    next()
}

module.exports = commentDeleteQuery