const SessionModel = require('../../models/Session')
const CommentModel = require('../../models/Comment')

const commentDeleteQuery = async(req, res, next) => {
    const {
        params: {sessionId, exerciseId, commentId},
        exerciseIds
    } = req

    let queries = []

    if (exerciseId && commentId) {
        // if specific Id, must remove from exercise sub doc array and in Comment collection
        const subdocQ = SessionModel.findOne({"createdByUserId": createdByUserId, "_id": sessionId})
        subdocQ.exercises.id(exerciseId) = subdocQ.exercises.id(exerciseId)['comments'].filter((comment) => {
            if (comment['commentId'] !== commentId) {
                return comment
            }
        })
        queries.push(subdocQ.save())

        queries.push(CommentModel.findByIdAndDelete(commentId))
    } else {
        // if here, it means the entire exercise is being deleted so just handle Comment collection here
        queries.push(CommentModel.deleteMany({exerciseId: [...exerciseIds]}))
    }

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(...queries)

    next()
}

module.exports = commentDeleteQuery