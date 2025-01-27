const routineDeleteQuery = require('./routine-delete-query')
const sessionDeleteQuery = require('./session-delete-query')
const exerciseSingleDeleteQuery = require('./exercise-single-delete-query')
const commentDeleteQuery = require('./comment-delete-query')
const runDeleteQueries = require('./run-delete-queries')

module.exports = {
    routineDeleteQuery,
    sessionDeleteQuery,
    exerciseSingleDeleteQuery,
    commentDeleteQuery,
    runDeleteQueries
}