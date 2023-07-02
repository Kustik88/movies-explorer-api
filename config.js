const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'long-key-word'
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/diplomafilmdb'

module.exports = {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
}
