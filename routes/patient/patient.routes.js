const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
    res.send('patient profile')
})

router.post('/profile', (req, res) => {
    res.send('patient profile POST')
})

router.get('/records', (req, res) => {
    res.send('Patient medical records')
})

router.post('/records', (req, res) => {
    res.send('patient records POST')
})

router.post('/visit', (req, res) => {
    res.send('patient visit POST')
})



module.exports = router;