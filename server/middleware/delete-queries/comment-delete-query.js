const {CommentModel} = require('../../models/Comment')

const commentDeleteQuery = async(req, res, next) => {
    const {
        params: {commentId},
        exerciseIds
    } = req

    let query = ''

    if (commentId) {
        query = CommentModel.findByIdAndDelete(commentId)
    } else {
        query = CommentModel.deleteMany({exerciseId: [...exerciseIds]})
    }

    if (!req.queries) {
        req.queries = []
    }
    req.queries.push(query)

    next()
}

module.exports = commentDeleteQuery