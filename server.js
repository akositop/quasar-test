const express = require('express')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/home/')

var app = express(),
  io = socket()

// For parsing application/json
app.use(express.json({ limit: '500mb' }))

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '500mb', extended: true }))

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(cors())
app.use(bodyParser())

// Add routes
app.get('/', routes.index)
// Create and Listen Server Routes
http.createServer(app)
  .listen(app.get('port'), () => {
      // console.log(`Now Listening on ${ app.get('port') }! Whew!`)
      // io.on('connection', (socket) => {
      //   console.log('a user connected');
      // });
  })