// const { where } = require('sequelize')
const Patient = require('../models/patient')

const getPatientProfile = async(req,res) => {
    const { username } = req.query

    try {
        const resultOfPatient = await Patient.findOne({where: {username}})

        if (resultOfPatient) {
            res.json(resultOfPatient)
        } else {
            res.status(404).send('patient not found')
        }
    } catch (error) {
        res.status(404).send('Server error')
    }
}

const createPatient = async(req,res) => {
    const {id_patient, fullname_patient, email_patient, password_patient, phone_patient, address_patient, geolocation_patient} = req.body

    try {
        const newPatient = await Patient.create({
            id_patient,
            fullname_patient,
            email_patient,
            password_patient,
            phone_patient,
            address_patient,
            geolocation_patient
        })

        res.status(201).json(newPatient)
    } catch (error) {
        res.status(500).send("Server error")
    }
}

const updatePatient = async (req,res) => {}
const deletePatient = async (req,res) => {}

module.exports = {getPatientProfile, createPatient, updatePatient, deletePatient}