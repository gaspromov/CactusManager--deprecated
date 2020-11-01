const compression = require('compression')
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())

app.use('/api/v1/admin/regkey', require('./routes/regKey'))
app.use('/api/v1/admin/users', require('./routes/users'))
app.use('/api/v1/licenses', require('./routes/licenses'))
app.use('/api/v1/auth', require('./routes/auth/auth'))

module.exports = app
