const express = require('express')
const router = express.Router({mergeParams: true})
const { getAllExercises, createExercise, getExercise, updateExercise, deleteExercise } = require('../controllers/exercises')
const { exerciseDeleteQuery, commentDeleteQuery, runDeleteQueries } = require('../middleware/delete-queries')

router.route('/').get(getAllExercises).post(createExercise)
router.route('/:exerciseId').get(getExercise).patch(updateExercise).delete(exerciseDeleteQuery, commentDeleteQuery, runDeleteQueries, deleteExercise)

/*
getAllExercises for the current sessionId from parent route
*/

module.exports = router