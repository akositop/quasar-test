const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
/* routes */
const routes = require('./routes/home/')
const chatRoutes = require('./routes/chat/')
const app = express()
const httpApp = http.createServer(app)
const io = socketIO(httpApp)

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
app.use('/api/', chatRoutes)


// Create and Listen Server Routes
httpApp.listen(app.get('port'), () => {
    // Display open port
    console.log(`Now Listening on Port ${ app.get('port') }! Whew!`)
    // Connection open
    io.on('connection', socket => {
      console.log(`A User connected!`);

      // Receiver from client message - Sending message
      socket.on('chatMessage', msgs => {
        console.log(`Message sent: ${ msgs }`)
        // Emit event and return to client
        io.emit('chatMessage', msgs)
      })
      // Receiver from client message - isTyping indicator
      socket.on('is typing', data => {
        // Emit event and return to client
        io.emit('typing', data);
       });

      // Disconnect Users
      socket.on('disconnect', () => {
        console.log('A User disconnected');
      });

    });
  })