const express = require('express')
const router = express.Router({mergeParams: true})
const { getAllSessions, createSession, getSession, updateSession, deleteSession } = require('../controllers/sessions')
const { sessionDeleteQuery, commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')

router.route('/').get(getAllSessions).post(createSession)
router.route('/:sessionId').get(getSession).patch(updateSession).delete(sessionDeleteQuery, commentDeleteQuery, runDeleteQueries, deleteSession)


/*
getAllSessions for the current routineId from parent route

For front end, delete all exercises in a session, the request is a patch with exercises = []
*/

module.exports = router