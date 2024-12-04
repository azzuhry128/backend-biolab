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
const router = express.Router();

router.use(patientRequestLogger);
// router.use(responseLogger)

// accounts
router.get("/account", loginPatient);
router.post("/account/create", createPatient);
router.put("/account/update/:id", auth, updatePatient);
router.delete("/account/delete/:id", auth, deletePatient);

// location | not finished
router.get("/account/location", auth);
router.post("/account/location/create", auth);
router.put("/account/location/update/:id", auth);
router.delete("/account/location/delete/:id", auth);

// payment | not finished
router.get("/account/payment", auth);
router.post("/account/payment/create", auth);
router.put("/account/payment/update/:id", auth);
router.delete("/account/payment/delete/:id", auth);

// password reset
router.post("/account/reset/otp", auth, resetOTP);
router.post("/account/reset/validate", auth, validateOTP);
router.post("/account/reset/password/:id", auth, resetPassword);

// service | not finished
router.get("/service/load", auth);
router.get("/service/book", auth);
router.get("/service/payment", auth);

module.exports = router;
