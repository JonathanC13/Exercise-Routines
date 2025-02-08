const express = require('express')
const router = express.Router()
const { getAllAccountExercises, createAccountExercise, getAccountExercise, updateAccountExercise, deleteAccountExercise } = require('../controllers/accountExercises')

router.route('/').get(getAllAccountExercises).post(createAccountExercise)
router.route('/:accountExerciseId').get(getAccountExercise).patch(updateAccountExercise).delete(deleteAccountExercise)

module.exports = router