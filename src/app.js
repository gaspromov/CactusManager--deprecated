const compression = require('compression')
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())

app.use('/api/v1/admin/regkey', require('./routes/admin/regKey'))
app.use('/api/v1/admin/users', require('./routes/admin/users'))
app.use('/api/v1/licenses', require('./routes/licenses'))
app.use('/api/v1/devices', require('./routes/devices'))
app.use('/api/v1/auth', require('./routes/auth/auth'))
app.use('/api/v1/users', require('./routes/users'))

module.exports = app
