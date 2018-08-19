'use strict'

const Room = require('../models/room')

function getRooms (req, res) {
  Room.find({}, (err, rooms) => {
    if (err) return res.status(500).send({ message: `Error al realiar la peticion: ${err}` })
    if (!rooms) return res.status(404).send({ message: `No existen habitaciones` })
    res.status(200).send({ rooms })
  })
}

function getRoomsByLessorId (req, res) {
  const lessorId = req.params.lessorId

  Room.find({ lessorId }, (err, rooms) => {
    if (err) return res.status(500).send({message: err})
    if (!rooms) return res.status(404).send({message: "No existen habitaciones"})
    res.status(200).send({ rooms })
  })
}

function getRoom (req, res) {
  let roomId = req.params.roomId

  Room.findById(roomId, (err, room) => {
    if (err) return res.status(500).send({ message: `Error en la peticion:${err}` })
    if(!room) return res.status(404).send({ message: `La habitacion no existe` })
    res.status(200).send({ room })
  })
}

function getRoomByUniversity (req, res) {
  let university = req.params.university

  Room.find({ universities: university } , (err, rooms) => {
    if (err) return res.status(500).send({ message: `Error en la peticion: ${err}` })
    if (!rooms) return res.status(404).send({ message: `No existen habitaciones cerca a ${university}` })
    res.status(200).send({ rooms })
  })
}

function saveRoom (req, res) {
  console.log('POST /api/room')
  console.log(req.body)

  let room = new Room({
    title: req.body.title,
    description: req.body.description,
    direction: req.body.direction,
    price: req.body.price,
    services: req.body.services,
    lessorId: req.body.lessorId,
    universities: req.body.universities,
    image: req.body.image
  })
  
  room.save((err, roomStored) => {
    if (err) return res.status(500).send({ message: err })
    res.status(200).send({ room: roomStored })
  })
}

function updateRoom (req, res) {
  let roomId = req.params.roomId
  let update = req.body

  Room.findByIdAndUpdate(roomId, update, (err, room) => {
    if (err) return res.status(500).send({message: err.message})
    if (!room) return res.status(404).send({message: `No exista la habitacion`})
    res.status(200).send({ room })
  })
}

function deleteRoom (req, res) {
  let roomId = req.params.roomId

  Room.findByIdAndRemove(roomId, (err, room) => {
    if (err) return res.status(500).send({ message: `Error al eliminar: ${err}` })
    if (!room) return res.status(404).send({ message: `No existe esa habitacion` })
    res.status(200).send({ message: `Habitacion eliminada`})
  })
}

async function addComment (req, res) {
  const roomId = req.params.roomId
  let opinion = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    text: req.body.text,
    calification: req.body.calification
  }
  Room.findByIdAndUpdate(roomId, {$push: {opinions: opinion}}, (err, room) => {
    if (err) return res.status(500).send({message: err})
    if (!room) return res.status(404).send({message: "No existe la habitacion"})
    res.status(200).send({room})
  })

  const finalCalification = await calculateFinalCalification(roomId)

  Room.findByIdAndUpdate(roomId, {calification: finalCalification}, (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    console.log("Calificación actualizada")
  })
}

async function calculateFinalCalification (roomId) {
  let result = await Room.findById(roomId, {opinions: "$opinions"})
  let total = 0
  result.opinions.forEach(i => {
    total+= i.calification
  })

  return Math.round(total / result.opinions.length)
}

module.exports = {
  getRooms,
  getRoom,
  getRoomByUniversity,
  saveRoom,
  updateRoom,
  deleteRoom,
  addComment,
  getRoomsByLessorId
}
