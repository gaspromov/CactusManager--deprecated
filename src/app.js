const compression = require('compression')
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(compression())
app.use(helmet())

module.exports = app
