const router = require('express').Router()
const routerAuth = require('./auth')
const routerMovies = require('./movies')
const routerUsers = require('./users')

router.use('/', routerAuth)
router.use('/users', routerUsers)
router.use('/movies', routerMovies)

module.exports = router
