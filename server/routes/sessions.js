const express = require('express')
const router = express.Router()
const { getAllSessions, createSession, getSession, updateSession, deleteSession } = require('../controllers/sessions')
const { sessionDeleteQuery, commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')
const exercisesRouter = require('./exercises')

router.route('/').get(getAllSessions).post(createSession)
router.route('/:sessionId').get(getSession).patch(updateSession).delete(sessionDeleteQuery, commentDeleteQuery, runDeleteQueries, deleteSession)

app.use('/exercises', exercisesRouter)

/*
getAllSessions for the current routineId from parent route
*/

module.exports = router