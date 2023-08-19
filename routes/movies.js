const router = require('express').Router()
const auth = require('../middlewares/auth')
const moviesController = require('../controllers/movies')
const { validateMovieBodyForPost, validateMovieParams } = require('../middlewares/validate')

router.use(auth)

router.get('/', moviesController.getCurrentUserMovies)
router.post('/', validateMovieBodyForPost, moviesController.createMovie)
router.delete('/:_id', validateMovieParams, moviesController.deleteMovie)

module.exports = router
