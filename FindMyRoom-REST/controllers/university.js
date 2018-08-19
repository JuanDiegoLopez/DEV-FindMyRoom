'use strict'

const University = require('../models/university')

function getUniversities (req, res) {
  University.find({}, (err, universities) => {
    if (err) return res.status(500).send({message: err})
    if (!universities) return res.status(404).send({message: "No existen universidades"})
    res.status(200).send({ universities })
  }) 
}

function getUniversity (req, res) {
  const universityId = req.params.universityId

  University.findById(universityId, (err, university) => {
    if (err) return res.status(500).send({message: err})
    if (!university) return res.status(404).send({message: "No existe esa universidad"})
    res.status(200).send({university})
  })
}

function saveUniversity (req, res) {
  const university = new University({
    name: req.body.name,
    direction: req.body.direction,
    phone: req.body.phone
  })

  university.save((err, universityStored) => {
    if (err) return res.status(500).send({message: err})
    res.status(200).send({university: universityStored})
  })
}

function deleteUniversity (req, res) {
  const universityId = req.body.universityId

  University.findByIdAndRemove(universityId, (err, university) => {
    if (err) res.status(500).send({message: err})
    if (!university) res.status(404).send({message: 'No existe esa universidad'})
    res.status(200).send({message: 'Universidad eliminada'})
  })
}

module.exports = {
  getUniversities,
  getUniversity,
  saveUniversity,
  deleteUniversity
}
