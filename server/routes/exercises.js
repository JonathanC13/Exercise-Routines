const express = require('express')
const router = express.Router()

router.get('/').get(getAllExercises)

/*
getAllExercises for the current sessionId from parent route
*/

module.exports = router