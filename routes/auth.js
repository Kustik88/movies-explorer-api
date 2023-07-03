const router = require('express').Router()
const { loginUser, createUser } = require('../controllers/users')

router.post('/signin', loginUser)
router.post('/signup', createUser)

module.exports = router
