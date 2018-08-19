'use strict'

const express = require('express')
const universityCtrl = require('../controllers/university')

const router = express.Router()

router.get('/university', universityCtrl.getUniversities)
router.get('/university/:universityId', universityCtrl.getUniversity)
router.post('/university', universityCtrl.saveUniversity)
router.delete('/university/', universityCtrl.deleteUniversity)

module.exports = router
