import io from 'socket.io-client'
export default {
  data() {
    return {
      message: '',
      messages: {
        sender:  [], // Device 
        receiver: [] // Other Device
      },
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
        this.messages.receiver.push(msg)
    })
  },
  created() {
    // let url = window.origin // prod mode
    let url = `http://localhost:3000` // dev mode

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
      this.messages.sender.push(this.message)
      this.socket.emit('chatMessage', this.message)
      this.message = ''
    }
  }
}