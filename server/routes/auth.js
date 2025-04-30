const express = require('express')
const { login, register, refreshToken, logout, updateUser } = require('../controllers/auth')

const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/refreshToken').get(refreshToken)
router.route('/logout').post(logout)
router.route('/updateUser/:userId').patch(updateUser)

module.exports = router