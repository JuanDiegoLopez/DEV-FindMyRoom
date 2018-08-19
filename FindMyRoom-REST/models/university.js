'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UniversitySchema = Schema({
  name: String,
  direction: String,
  phone: String,
})

module.exports = mongoose.model('University', UniversitySchema)