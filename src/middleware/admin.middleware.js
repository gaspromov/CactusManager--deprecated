const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET } = require('../config/keys')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    if (decoded.userId !== 'admin') {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }
}
