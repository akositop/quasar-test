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
        console.log(`Message sent: ${ msgs.message[0] }`)
        // Emit event and return to client
        socket.broadcast.emit('chatMessage', msgs.message[0])
      })
      // Receiver from client message - isTyping indicator
      socket.on('typing', data => {
        // Emit event and return to client
        socket.broadcast.emit('typing', data);
       });

       socket.on('stopTyping', data => {
        // Emit event and return to client
        socket.broadcast.emit('stopTyping', data);
       });

      // Disconnect Users
      socket.on('disconnect', () => {
        console.log('A User disconnected');
      });

      // Create socket user
      socket.on('created', data => {
        socket.broadcast.emit('created', data)
      })
    });
  })