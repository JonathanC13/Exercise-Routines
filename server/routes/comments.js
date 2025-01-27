const express = require('express')
const router = express.Router({mergeParams: true})
const { getAllComments, createComment, getComment, updateComment, deleteComment } = require('../controllers/comments')
const { commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')

router.route('/').get(getAllComments).post(createComment)
router.route('/:commentId').get(getComment).patch(updateComment).delete(commentDeleteQuery, runDeleteQueries, deleteComment)

/*
getAllComments for route param :exerciseId

*/

module.exports = router