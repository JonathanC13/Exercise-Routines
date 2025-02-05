const SessionModel = require('../../models/Session')
const { CommentModel } = require('../../models/Comment')
const {BadRequestError} = require('../../errors')

const commentDeleteQuery = async(req, res, next) => {
    const {
        params: {sessionId, exerciseId, commentId},
        user: { userId: createdByUserId },
        exerciseIds,
        session: session
    } = req

    let queries = []

    let newSession = session
    if (!newSession) {
        newSession = await mongoose.startSession();
    }

    if (exerciseIds) {
        // if here, it means the entire exercise is being deleted so just handle Comment collection here
        queries.push(['comment', CommentModel.deleteMany({createdByUserId, exerciseId: [...exerciseIds]}, {session: newSession})])
    } else {
        if (!commentId) {
            throw new BadRequestError('Missing comment Id!')
        }

        // if specific Id, must remove from exercise sub doc array and in Comment collection
        const subdocQ = SessionModel.findOne({_id: sessionId, createdByUserId}).session(newSession)
        subdocQ.exercises.id(exerciseId) = subdocQ.exercises.id(exerciseId).comments.filter((comment) => {
            if (comment._id !== commentId) {
                return comment
            }
        })
        subdocQ.save()
        queries.push(['comment', subdocQ])

        queries.push(['comment', CommentModel.findOneAndDelete({_id: commentId, createdByUserId}, {session: newSession})])
    }

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(...queries)
    req.session = newSession

    next()
}

module.exports = commentDeleteQuery