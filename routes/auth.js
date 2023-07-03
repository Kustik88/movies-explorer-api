const router = require('express').Router()
const { loginUser } = require('../controllers/users')

router.post('/signin', loginUser)
router.post('/signup',)

module.exports = router
