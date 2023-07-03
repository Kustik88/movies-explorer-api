const router = require('express').Router()
const auth = require('./auth')
const { getUserInfo, editUserInfo } = require('../controllers/users')

router.use(auth)

router.get('/me', getUserInfo)
router.patch('/me', editUserInfo)

module.exports = router
