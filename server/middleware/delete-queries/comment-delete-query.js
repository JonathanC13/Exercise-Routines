const SessionModel = require('../../models/Session')
const CommentModel = require('../../models/Comment')
const {BadRequestError} = require('../../errors')

const commentDeleteQuery = async(req, res, next) => {
    const {
        params: {sessionId, exerciseId, commentId},
        exerciseIds
    } = req

    let queries = []

    if (exerciseIds) {
        // if here, it means the entire exercise is being deleted so just handle Comment collection here
        queries.push(CommentModel.deleteMany({exerciseId: [...exerciseIds]}))
    } else {
        if (!commentId) {
            throw new BadRequestError('Missing comment Id!')
        }

        // if specific Id, must remove from exercise sub doc array and in Comment collection
        const subdocQ = SessionModel.findById(sessionId)
        subdocQ.exercises.id(exerciseId) = subdocQ.exercises.id(exerciseId).comments.filter((comment) => {
            if (comment._id !== commentId) {
                return comment
            }
        })
        subdocQ.save()
        queries.push(subdocQ)

        queries.push(CommentModel.findByIdAndDelete(commentId))
    }

    

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(...queries)

    next()
}

module.exports = commentDeleteQuery