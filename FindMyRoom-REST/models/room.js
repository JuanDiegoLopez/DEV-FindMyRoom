'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = Schema({
  title: String,
  description: String,
  direction: String,
  price: {type: Number, default: 0},
  calification: {type: Number, default: 0},
  services: [{
    id: Number,
    icon: String,
    name: String
  }],
  opinions: [{
    image: {type: String, default: "https://findmyroom.herokuapp.com/img/users/profile.png"},
    text: String,
    name: String,
    lastname: String,
    email: String,
    calification: Number,
    date: {type: Date, default:Date.now }
  }],
  lessorId: String,
  universities: Array,
  image: String
})

module.exports = mongoose.model('Room', RoomSchema)
