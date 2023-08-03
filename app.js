const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const rateLimiter = require('./middlewares/rateLimiter')
const handlerError = require('./middlewares/handlerError')
const router = require('./routes')
const NotFoundError = require('./errors/NotFoundError')
const { PORT, DB_ADDRESS } = require('./config')
const { requestLogger, errorLogger } = require('./middlewares/logger')

// const allowedCors = [
//   'http://localhost:3000',
//   'http://kust-project.nomoreparties.sbs',
// ]

mongoose.connect(DB_ADDRESS)

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))

app.use(rateLimiter)
app.use(express.json())
app.use(helmet())
app.use(requestLogger)
app.use(cookieParser())

app.use(router)
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'))
})
app.use(errorLogger)
app.use(errors())
app.use(handlerError)

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
})
