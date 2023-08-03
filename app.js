const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const corsOptions = require('./middlewares/cors')
const rateLimiter = require('./middlewares/rateLimiter')
const handlerError = require('./middlewares/handlerError')
const router = require('./routes')
const NotFoundError = require('./errors/NotFoundError')
const { PORT, DB_ADDRESS } = require('./config')
const { requestLogger, errorLogger } = require('./middlewares/logger')

mongoose.connect(DB_ADDRESS)

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
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
app.get('/products/:id', cors(corsOptions), (req, res) => {
  res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' })
})

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
})
