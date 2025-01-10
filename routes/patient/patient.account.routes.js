const express = require("express");
const {
  createPatient,
  updatePatient,
  deletePatient,
  resetPassword,
  resetOTP,
  validateOTP,
  loginPatient,
} = require("../../controllers/patient/patient.controller.account");

const {
  patientRequestLogger,
} = require("../../middleware/requestLogger.middleware");

const { auth } = require("../../middleware/auth.middleware");
const { createPayment, createVisit } = require("../../controllers/patient/patient.controller.visit");
const { getCategoryData, getHospitalRelatedToCategory, getServiceDetail, getHospitalDoctors } = require("../../controllers/patient/patient.controller.data");
const router = express.Router();

router.use(patientRequestLogger);
// router.use(responseLogger)

// accounts
router.post("/account/login", loginPatient);
router.post("/account/create", createPatient);
router.put("/account/update/:id", auth, updatePatient);
router.delete("/account/delete/:id", auth, deletePatient);

// location | not finished
router.post("/location", auth);
router.post("/location/create", auth);
router.put("/location/update/:id", auth);
router.delete("/location/delete/:id", auth);

// location live receiving mechanism | not finished

// payment | not finished
router.post("/account/payment", auth);
router.post("/payment/create", createPayment);

// password reset
router.post("/account/reset/otp", auth, resetOTP);
router.post("/account/reset/validate", auth, validateOTP);
router.post("/account/reset/password/:id", auth, resetPassword);

// service | not finished
router.get("/category/data", getCategoryData);
router.get("/hospital/data/:id", getHospitalRelatedToCategory);
router.get("/service/data/:hospitalID/:categoryID", getServiceDetail);
router.get("/doctor/data/:id", getHospitalDoctors);

// visit
router.post("/visit/create", createVisit);

module.exports = router;
