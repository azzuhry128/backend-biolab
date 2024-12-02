const express = require("express");
const {
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  loginPatientController,
  resetPassword,
  resetPasscode,
  resetAccess,
  resetOTP,
  validateOTP,
} = require("../../controllers/patient/patient.controller.account");
const {
  patientRequestLogger,
  responseLogger,
} = require("../../middleware/requestLogger.middleware");
const { sendEmail } = require("../../middleware/email.middleware");
const { auth } = require("../../middleware/auth.middleware");
const router = express.Router();

router.use(patientRequestLogger);
// router.use(responseLogger)

// routes for anything related to account
router.get("/account", loginPatientController);

router.post("/account", createPatient);

router.put("/account/:id", auth, updatePatient);

router.delete("/account/:id", auth, deletePatient);

router.post("/account/reset/otp", auth, resetOTP);

router.post("/account/reset/validate", auth, validateOTP);

router.post("/account/reset/password/:id", auth, resetPassword);

// routes for password resets

// router.post("/tracking")

module.exports = router;
