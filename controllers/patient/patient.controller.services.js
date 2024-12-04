require("dotenv").config();

const { Patient } = require("../../models");
const { Service } = require("../../models");
const { Visit } = require("../../models");

const getServices = async (req, res) => {
  const result = await Service.findAll();
  return res.status(200).json(result);
};

const bookService = async (req, res) => {
  const {
    patient_id,
    patient_name,
    patient_longitude,
    patient_latitude,
    patient_payment,
  } = req.body;

    //   const doctorConfirmation = await
    //   const paymentConfirmation = await

  const result = await Visit.create();
  return res.status(200).json(result);
};

module.exports = { getServices };
