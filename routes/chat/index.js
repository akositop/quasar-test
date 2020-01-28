const express = require('express')
const router = express.Router()

router.post('/chat', (req, res) => {
  try {
    let params = req.body
    res.send(params)
  } catch(e) {
    console.log(e)
    res.send({
      error: 'error'
    })
  }
})

module.exports = router