'use strict'

const express = require('express')
const roomCtrl = require('../controllers/room')

const router = express.Router()

router.get('/room', roomCtrl.getRooms)
router.get('/room/:roomId',roomCtrl.getRoom)
router.get('/room/university/:university', roomCtrl.getRoomByUniversity)
router.get('/room/lessor/:lessorId', roomCtrl.getRoomsByLessorId)
router.post('/room', roomCtrl.saveRoom),
router.put('/room/:roomId', roomCtrl.updateRoom)
router.post('/room/addComment/:roomId', roomCtrl.addComment)
router.delete('/room/:roomId', roomCtrl.deleteRoom)

module.exports = router
