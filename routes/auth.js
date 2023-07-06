const router = require('express').Router()
const userController = require('../controllers/users')
const { validateUserBodyForSignUp, validateUserBodyForSignIn } = require('../middlewares/validate')

router.post('/signin', validateUserBodyForSignIn, userController.loginUser)
router.post('/signup', validateUserBodyForSignUp, userController.createUser)
router.post('/signout', userController.signoutUser)

module.exports = router
