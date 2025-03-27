const express = require('express')
const { login, register, refreshToken, logout } = require('../controllers/auth')

const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/refreshToken').get(refreshToken)
router.route('/logout').get(logout)

module.exports = router