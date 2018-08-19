'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
}

mongoose.Promise = global.Promise

mongoose.connect(config.db, options, (err, res) => {
  if (err) {
    return console.log(`Error al conectar base de datos: ${err}`)
  }

  console.log('Conexion a la base de datos establecida')

  app.listen(config.port, () => {
    console.log(`API-REST corriendo en http://localhost:${config.port}`)
  })
})
