'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const roomRoutes = require('./routes/room')
const universityRooms = require('./routes/university')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
  next()
})

app.use(express.static('./public'))

app.use('/api', roomRoutes)
app.use('/api', universityRooms)

module.exports = app
