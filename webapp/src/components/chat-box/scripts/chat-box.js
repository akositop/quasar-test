import io from 'socket.io-client'
export default {
  data() {
    return {
      text: '',
      sentText: [],
      socket: null,
      isTyping: false,
      dense: false,
      labelText: 'Enter Message'
    }
  },
  mounted() {
    // Emit Receiver from server (Web Sockets)
    this.socket.on('chatMessage', msg => {
      this.sentText.push(msg)
    })

    this.socket.on('typing', isTyping => {
      this.isTyping = isTyping
    })
  },
  created() {
    // let url = window.origin // prod mode
    let url = `http://localhost:3000` // dev mode

    this.socket = io(url)
  },
  methods: {
    sendMessage() {
      // Sending to server
      this.socket.emit('chatMessage', this.text)
      this.text = ''
    },
    pressButton() {
      // this.socket.broadcast.emit('typingMessage', {
      //   sender: 
      // })
      clearTimeout()
      setTimeout(() => {
        if(this.text.length > 0) {
          // this.isTyping = true
          // this.socket.emit('is typing', this.isTyping)
          console.log('true')
        } else {
          // this.isTyping = false
          // this.socket.emit('is typing', this.isTyping)
          console.log('false')
        }
      }, 1000)
    }
  }
}