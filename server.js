/* eslint-disable no-fallthrough */
const http = require('http'),
  path = require('path'),
  express = require('express'),
  mongoose = require('mongoose')

require('dotenv').config({ path: '.node.env' })

// database setup
// eslint-disable-next-line no-process-env
const { MONGO_USER, MONGO_PWD, MONGO_HOST, MONGO_PORT, MONGO_DB, PORT } = process.env

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST || 'localhost'}:${MONGO_PORT || 27017}/${MONGO_DB}?authSource=admin`, options = {
  useNewUrlParser: true,
  dbName: MONGO_DB 
}

mongoose.connect(mongoURI, options).catch(() => console.error(`Failed to connect to MongoDB`))
mongoose.connection.on('open', () => {
    console.log('MongoDB successfully connected')
})

mongoose.connection.on('error', error => {
    console.error('MongoDB experienced error', error)
})

// app setup
const app = express()
const port = normalizePort(PORT || 3000)

app.set('port', port)

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})

app.use('/api', require('./api'))

var server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
