const express = require('express')
const { login, register, refreshToken, logout, updateUserInfo, updatePassword } = require('../controllers/auth')

const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/refreshToken').get(refreshToken)
router.route('/logout').post(logout)
router.route('/updateUserInfo/:userId').patch(updateUserInfo)
router.route('/updatePassword/:userId').patch(updatePassword)

module.exports = router