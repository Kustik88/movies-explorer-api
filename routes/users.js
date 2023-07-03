const router = require('express').Router()
const auth = require('./auth')

router.use(auth)

router.get('/me',)
router.patch('/me',)

module.exports = router
