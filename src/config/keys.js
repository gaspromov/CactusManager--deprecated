const production = require('./production')
const development = require('./development')

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return production
  }
  return development
}
