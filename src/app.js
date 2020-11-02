const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(cors())

app.use('/api/v1/admin/regkey', require('./routes/admin/regKey'))
app.use('/api/v1/admin/users', require('./routes/admin/users'))
app.use('/api/v1/licenses', require('./routes/licenses'))
app.use('/api/v1/devices', require('./routes/devices'))
app.use('/api/v1/auth', require('./routes/auth/auth'))
app.use('/api/v1/users', require('./routes/users'))

app.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    `
            default-src * 'self'; 
            script-src * 'self' 'unsafe-inline';
            style-src * 'self' 'unsafe-inline'; 
            img-src * 'self' data: https:;
          `
  )
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
