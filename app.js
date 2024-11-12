const express = require('express')
const app = express()
const router = express.Router()
const port = 3000

const patientRoutes = require('./routes/patient/patient.routes.js')

app.use('/patient', patientRoutes)

router.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Example app running on port ${port}`)
})

