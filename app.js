const express = require('express')

const mongoose = require('mongoose')
const helmet = require('helmet')
// const { errors } = require('celebrate')
const { PORT, DB_ADDRESS } = require('./config')

mongoose.connect(DB_ADDRESS)

const app = express()
app.use(express.json())
app.use(helmet())

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`)
})
