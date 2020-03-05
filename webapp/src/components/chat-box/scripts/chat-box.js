import io from 'socket.io-client'
import moment from 'moment'
export default {
  name: 'ChatBox',
  data() {
    return {
      message: '',
      messages: {
        sender:  [], // Device 
        receiver: [] // Other Device
      },
      conversations: [],
      socket: null,
      isTyping: false,
      dense: false,
      labelText: 'Enter Message'
    }
  },
  mounted() {
    // Listen emit from server (Web Sockets)
    // Sending to server and listen emit for receiver
    this.socket.on('chatMessage', msg => {
        this.conversations.push({
          timestamp: moment().format('YYYY-MM-DD@HH:MM:ss'),
          message: [msg],
          isSender: false
        })
    })
  },
  created() {
    // let url = window.origin // prod mode
    // let url = `http://localhost:3000` // dev mode
    let url = `http://10.10.11.124:3000`
    
    this.socket = io(url)

    this.socket.emit('created', 'Patrick Nengasca')
    this.socket.on('created', data => {
      console.log(data)
    })

    this.socket.on('typing', () => {
      this.isTyping = true
    })

    this.socket.on('stopTyping', () => {
      this.isTyping = false
    })
  },
  watch: {
    message(value) {
      value ? this.socket.emit('typing') : this.socket.emit('stopTyping')
    }
  },
  methods: {
    sendMessage() {
      // Sending to server and listen emit for this device / Sender
      this.conversations.push({
        timestamp: moment().format('YYYY-MM-DD@HH:MM:ss'),
        message: [this.message],
        isSender: true
      })
      this.socket.emit('chatMessage', {
        timestamp: moment().format('YYYY-MM-DD@HH:MM:ss'),
        message: [this.message],
        isSender: true
      })
      this.message = ''
    }
  }
}