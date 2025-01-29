const express = require('express')
const router = express.Router({mergeParams: true})
const { getAllSessions, createSession, getSession, updateSession, deleteSession, deleteAllSessions } = require('../controllers/sessions')
const { sessionDeleteQuery, commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')

router.route('/').get(getAllSessions).post(createSession)
router.route('/:sessionId').get(getSession).patch(updateSession).delete(sessionDeleteQuery, commentDeleteQuery, runDeleteQueries, deleteSession)


/*
getAllSessions for the current routineId from parent route
*/

module.exports = router