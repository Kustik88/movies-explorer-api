const whitelist = ['http://localhost:3000', 'http://kust-project.nomoreparties.sbs']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

module.exports = corsOptions
