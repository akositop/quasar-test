const express = require('express')
const router = express.Router()

router.post('/chat', async(req, res) => {
  try {
    let params = req.body
    res.send('Char!')
  } catch(e) {
    console.log(e)
    res.send({
      error: 'error'
    })
  }
})

module.exports = router