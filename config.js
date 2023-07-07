const dotenv = require('dotenv')

dotenv.config()

const nodeEnvIsProduction = process.env.NODE_ENV === 'production'

const PORT = nodeEnvIsProduction ? process.env.PORT : 3000
const JWT_SECRET = nodeEnvIsProduction ? process.env.JWT_SECRET : 'long-key-word'
const DB_ADDRESS = nodeEnvIsProduction ? process.env.DB_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb'

module.exports = {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
}
