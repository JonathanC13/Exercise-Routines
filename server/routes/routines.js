const express = require('express')
const router = express.Router()
const { getAllRoutines, getRoutine, createRoutine, updateRoutine, deleteRoutine } = require('../controllers/routines')
const { routineDeleteQuery, sessionDeleteQuery, commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')

router.route('/').get(getAllRoutines).post(createRoutine)
router.route('/:routineId').get(getRoutine).patch(updateRoutine).delete(routineDeleteQuery, sessionDeleteQuery, commentDeleteQuery, runDeleteQueries, deleteRoutine)

/* 
getAllRoutines for the current userId

For all routes, no delete all option. Must specify id.

For delete, deleting a routine also deletes all session documents associated with the routine, comment documents associated with the exersice subdocument in the sesssons.
    1. In the middleware, add the queries to like req.queries = []
    2. in the controller, start a mongoose session and try to commit them all or nothing.

    middleware:
        1.  Query to delete the Routine document
            const {routineId} = req.params
            if !req.queries: req.queries = []
            create query model.findByIdAndDelete(id) and push into req.queries
            req.routineId = routineId
            next()
        2.  Query to delete all sessions that reference the RoutineId
            if req.routineId
                // routine is being deleted
                sessionsIds = [get all sessions with the routineId = model.find({routineId})]
                
            else
                // specific session
                const {sessionId} = req.params
                sessionIds = [model.findOne({sessionId})]

            Since exercises are a subdoc of session, iterate all the exercises for the sessions and save the Ids in req.exerciseIds = [array of all the exercise IDs that belonged to this session]
            
            if !req.queries: req.queries = []
            iterate the session Ids and create queries model.findByIdAndDelete(sessionId) and push into req.queries OR just do deleteMany()

            next()
        3.  Query to delete comments 
            if req.exerciseIds
                // single exercise OR session is being deleted, therefore all its exercises
                commentIds = [get all comments with the exerciseIds, model.find({exerciseIds})
            else
                // single comment
                const {commentId} = req.params
                commentIds = [model.findOne({commentId})]

            if !req.queries: req.queries = []
            iterate the commentIds and create queries model.findByIdAndDelete(comment) and push into req.queries

            next()


        4.  finally in Routine controller.
            Create session for a transaction for all the queries in req.queries

            on success res.status(OK) success
*/

module.exports = router