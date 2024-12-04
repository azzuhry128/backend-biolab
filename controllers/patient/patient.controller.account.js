require("dotenv").config();

const OTPAuth = require("otpauth");

const { Patient } = require("../../models");
const { PatientLocation } = require("../../models");
const { PatientPayment } = require("../../models");

const bcrypt = require("bcrypt");
const emailjs = require("@emailjs/nodejs");
const jwt = require("jsonwebtoken");

const emailServiceID = process.env.EMAIL_SERVICE_ID;
const emailTemplateID = process.env.EMAIL_TEMPLATE_ID;
const emailPublicKey = process.env.EMAIL_PUBLIC_KEY;
const emailPrivateKey = process.env.EMAIL_PRIVATE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Patient.findOne({ where: { patient_email: email } });

    if (!account) {
      res.status(404).json({ message: "account not found" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      account.patient_password
    );

    if (!matchedPassword) {
      res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id_patient: account.id_patient, patient_name: account.patient_name },
      SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    // patient location
    const patientLocation = await PatientLocation.findAll({
      where: { id_patient: account.id_patient },
    });

    // patient payment
    const patientPayment = await PatientPayment.findAll({
      where: { id_patient: account.id_patient },
    });

    const patientObject = {
      information: account,
      location: patientLocation,
      payment: patientPayment,
      token: token,
    };

    res
      .status(200)
      .json({ message: "Login Successful", patientData: patientObject });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const createPatient = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await Patient.findOrCreate({
      where: { patient_name: name, patient_email: email },
      defaults: {
        patient_name: name,
        patient_email: email,
        patient_password: hashedPassword,
      },
    });

    return res.status(200).json(result);
  } catch (err) {
    console.log("error occured:", err);
  }
};

const updatePatient = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullname, email, phone } = req.body;

    const result = await Patient.update(
      { fullname: fullname, email: email, phone: phone },
      { where: { id: id } }
    );

    return res.status(200).json({ message: "account updated", target: result });
  } catch (error) {
    console.log("error updating user:", error);
  }
};

const deletePatient = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Patient.destroy({ where: { id: id } });

    return res.status(200).json({ message: "account deleted", target: result });
  } catch (error) {}
};

// beginning of password reset mechanism
const resetOTP = async (req, res) => {
  const { to_name, to_email } = req.body;

  let secret = new OTPAuth.Secret({ size: 20 });

  let totp = new OTPAuth.TOTP({
    issuer: "Biolab",
    label: "azzuhry",
    algorithm: "SHA1",
    digits: 6,
    period: 120,
    secret: secret,
  });

  let token = totp.generate(secret);

  emailjs.init({
    publicKey: emailPublicKey,
    privateKey: emailPrivateKey,
  });

  const emailTemplateParams = {
    from_name: "Biolab",
    to_name: to_name,
    to_email: to_email,
    message: `your password reset code it  ${token} and valid for 30 seconds`,
  };

  emailjs.send(emailServiceID, emailTemplateID, emailTemplateParams).then(
    (response) => {
      res.status(200).json({
        message: "Email sent successfully",
        data: response,
        secret: secret.base32,
      });
    },
    (error) => {
      res.status(500).json({ message: "Error sending email", data: error });
    }
  );
};

const validateOTP = async (req, res) => {
  const { token, secret } = req.body;
  const decodedSecret = OTPAuth.Secret.fromBase32(secret);

  let totp = new OTPAuth.TOTP({
    issuer: "Biolab",
    label: "azzuhry",
    algorithm: "SHA1",
    digits: 6,
    period: 120,
    secret: decodedSecret,
  });
  const delta = totp.validate({ token, window: 1 });

  try {
    if (delta == null) {
      res.status(400).json({ message: "token is invalid or expired" });
    } else {
      let seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
      res.status(200).json({ message: "token is valid", data: seconds });
    }
  } catch (error) {
    res.status(500).json({ message: "error occurred", data: error });
  }
};

const resetPassword = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await Patient.update(
      { password: hashedPassword },
      { where: { id: id } }
    );

    res.status(200).json({ message: "password updated", data: result });
  } catch (error) {
    res.status(500).json({ message: "error occurred", data: error });
  }
};

// end of password reset mechanism
module.exports = {
  loginPatient,
  createPatient,
  updatePatient,
  deletePatient,
  resetOTP,
  validateOTP,
  resetPassword,
};
