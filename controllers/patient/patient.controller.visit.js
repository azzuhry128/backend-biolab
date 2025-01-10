require("dotenv").config();

const { Patient } = require("../../models");
const { Service } = require("../../models");
const { Visit } = require("../../models");
const { NewVisit } = require("../../models");

const crypto = require("crypto");
const axios = require('axios');

const getServices = async (req, res) => {
  const result = await Service.findAll();
  return res.status(200).json(result);
};

const createVisit = async (req, res) => {
  const {
    patientID,
    hospitalID,
    doctorID,
    status,
    nameVisit,
    feeVisit,
    ratingVisit,
    scoreVisit,
  } = req.body;

  try {
    const result = await NewVisit.create({
      id_patient: patientID,
      id_hospital: hospitalID,
      id_doctor: doctorID,
      status: status,
      name_visit: nameVisit,
      fee_visit: feeVisit,
    })
    if (result) {
      res.status(200).json({ message: "visit created", data: result });
    }
  } catch (error) {
    
  }
};

const createPayment = async (req, res) => {
  const {method, amount, customerName, customerEmail, customerPhone, orderItems} = req.body;

  const milisecond = new Date().getTime();
  const stringmilisecond = milisecond.toString();
  const companycode = "PP"

  const apikey = "DEV-J3UWIYtEaTC2gtxcs40zjGWggFMnR1ftcmXyvmL8"
  const privatekey = "wr4l7-sYX74-6wtMr-p73M3-T0jx4"
  const merchant_code = "T36666"
  const merchant_ref = companycode + stringmilisecond

  const expiry = parseInt(Math.floor(new Date()/1000) + (24*60*60));

  const signature = crypto.createHmac('sha256', privatekey).update(merchant_code + merchant_ref + amount).digest('hex');
  
  const payload = {
    'method': method,
    'merchant_ref': merchant_ref,
    'amount': amount,
    'customer_name': customerName,
    'customer_email': customerEmail,
    'customer_phone': customerPhone,
    'order_items': orderItems,
    'expired_time': expiry,
    'signature': signature
  }

  
  try {
    const result = await axios.post('https://tripay.co.id/api-sandbox/transaction/create', payload, {
      headers: {
        'Authorization': 'Bearer ' + apikey
      },
      validateStatus: function (status) {
        return status < 999; // Resolve only if the status code is less than 500
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
  }
};

module.exports = { 
  getServices,
  createPayment, 
  createVisit
};
