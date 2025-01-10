require("dotenv").config();

const OTPAuth = require("otpauth");

const { HospitalAccount } = require("../../models");
const { Doctor } = require("../../models");


const bcrypt = require("bcrypt");
const emailjs = require("@emailjs/nodejs");
const jwt = require("jsonwebtoken");
const doctor = require("../../models/doctor");

const emailServiceID = process.env.EMAIL_SERVICE_ID;
const emailTemplateID = process.env.EMAIL_TEMPLATE_ID;
const emailPublicKey = process.env.EMAIL_PUBLIC_KEY;
const emailPrivateKey = process.env.EMAIL_PRIVATE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// hospital account CRUD
const loginHospital = async (req, res) => {
  const { hospitalEmail, hospitalPassword } = req.body;

  try {
    const account = await HospitalAccount.findOne({ where: { hospital_email: hospitalEmail } });

    if (!account) {
      res.status(404).json({ message: "hospital account not found" });
    }

    const matchedPassword = await bcrypt.compare(
      hospitalPassword,
      account.hospital_password
    );

    if (!matchedPassword) {
      res.status(401).json({ message: "Invalid hospital password" });
    }

    const token = jwt.sign(
      { id_hospital: account.id_hospital, hospital_name: account.hospital_name },
      SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    const hospitalObject = {
      id: account.id_hospital,
      name: account.hospital_name,
      email: account.hospital_email,
      longitude: account.hospital_longitude,
      latitude: account.hospital_latitude,
      token: token,
    };

    res.send({ message: "Hospital Login Successful", hospitalData: hospitalObject });
  } catch (error) {
    console.log("error occured:", error);
  }
};

const createHospital = async (req, res) => {
  const { hospitalName, hospitalEmail, hospitalPassword, hospitalLongitude, hospitalLatitude } = req.body;
  const hashedPassword = await bcrypt.hash(hospitalPassword, 10);

  try {
    const result = await HospitalAccount.findOrCreate({
      where: { hospital_name: hospitalName, hospital_email: hospitalEmail },
      defaults: {
        hospital_name: hospitalName,
        hospital_email: hospitalEmail,
        hospital_password: hashedPassword,
        hospital_longitude: hospitalLongitude,
        hospital_latitude: hospitalLatitude
      },
    });

    res
      .status(200)
      .json({ message: "Hospital Account Created", hospitalData: result });
  } catch (err) {
    console.log("error occured:", err);
  }
};

const editHospital = async (req,res) => {
    try {
        const hospitalID = req.params.id;
        const { hospitalName, hospitalEmail, hospitalLongitude, hospitalLatitude} = req.body;
    
        const result = await HospitalAccount.update(
          { hospital_name: hospitalName, hospital_email: hospitalEmail, hospital_longitude: hospitalLongitude, hospital_latitude: hospitalLatitude },
          { where: { id_hospital: hospitalID } }
        );
    
        return res.status(200).json({ message: "hospital account updated", target: result });
      } catch (error) {
        console.log("error updating hospital:", error);
    }
}

const deleteHospital = async (req,res) => {
    try {
        const hospitalID = req.params.id;
    
        const result = await HospitalAccount.destroy({ where: { id_hospital: hospitalID } });
    
        return res.status(200).json({ message: "hospital account deleted", target: result });
      } catch (error) {}
}

// hospital password reset mechanism
const resetHospitalOTP = async (req, res) => {
    const { to_name, to_email } = req.body;

    let secret = new OTPAuth.Secret({ size: 20 });
  
    let totp = new OTPAuth.TOTP({
      issuer: "Biolab",
      label: "azzuhry",
      algorithm: "SHA1",
      digits: 6,
      period: 300,
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
          message: "Hospital email sent successfully",
          data: response,
          secret: secret.base32,
        });
      },
      (error) => {
        res.status(500).json({ message: "Error sending hospital email", data: error });
      }
    );
}

const validateHospitalOTP = async (req, res) => {
    const { token, secret } = req.body;
    const decodedSecret = OTPAuth.Secret.fromBase32(secret);
  
    let totp = new OTPAuth.TOTP({
      issuer: "Biolab",
      label: "azzuhry",
      algorithm: "SHA1",
      digits: 6,
      period: 300,
      secret: decodedSecret,
    });
    const delta = totp.validate({ token, window: 1 });
  
    try {
      if (delta == null) {
        res.status(400).json({ message: "hospital token is invalid or expired" });
      } else {
        let seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
        res.status(200).json({ message: "hospital token is valid", data: seconds });
      }
    } catch (error) {
      res.status(500).json({ message: "error occurred", data: error });
    }
}

const resetHospitalPassword = async (req, res) => {
    const hospitalID = req.params.id;
    const { password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const result = await Doctor.update(
        { password: hashedPassword },
        { where: { id_hospital: hospitalID } }
      );
  
      res.status(200).json({ message: "hospital password updated", data: result });
    } catch (error) {
      res.status(500).json({ message: "error occurred", data: error });
    }
}

// const getVisitData = async (req, res) => {
//   const hospitalID = req.params.id;
//   try {
//     const Visit
//   } catch (error) {
    
//   }
// }

// doctor account CRUD
const getDoctor = async (req,res) => {
    const hospitalID = req.params.id;
    try {
        const result = await Doctor.findAll({ where: { id_hospital: hospitalID } });
        return res.status(200).json(result);
    } catch (error) {
        console.log("error occured:", error);
    }
}

const createDoctor = async (req, res) => {
    const { hospitalID, doctorName, doctorEmail, doctorPassword } = req.body;
    const hashedPassword = await bcrypt.hash(doctorPassword, 10);
  
    try {
      const result = await Doctor.findOrCreate({
        where: { doctor_name: doctorName, doctor_email: doctorEmail },
        defaults: {
          id_hospital: hospitalID,
          doctor_name: doctorName,
          doctor_email: doctorEmail,
          doctor_password: hashedPassword,
        },
      });

      res
      .status(200)
      .json({ message: "Doctor Account Created", doctorData: result });
    } catch (err) {
      console.log("error occured:", err);
    }
};

const editDoctor = async (req, res) => {
    try {
        const doctorID = req.params.id;
        const { doctorName, doctorEmail } = req.body;
    
        const result = await Doctor.update(
          { doctor_name: doctorName, doctor_email: doctorEmail },
          { where: { id_doctor: doctorID } }
        );
    
        return res.status(200).json({ message: "doctor account updated", target: result });
      } catch (error) {
        console.log("error updating doctor:", error);
    }
};

const deleteDoctor = async (req,res) => {
    try {
        const doctorID = req.params.id;
    
        const result = await Doctor.destroy({ where: { id_doctor: doctorID } });
    
        return res.status(200).json({ message: "doctor account deleted", target: result });
      } catch (error) {}
}

const resetDoctorOTP = async (req, res) => {
    const { to_name, to_email } = req.body;

    let secret = new OTPAuth.Secret({ size: 20 });
  
    let totp = new OTPAuth.TOTP({
      issuer: "Biolab",
      label: "azzuhry",
      algorithm: "SHA1",
      digits: 6,
      period: 300,
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
          message: "Doctor email sent successfully",
          data: response,
          secret: secret.base32,
        });
      },
      (error) => {
        res.status(500).json({ message: "Error sending doctor email", data: error });
      }
    );
}

const validateDoctorOTP = async (req, res) => {
    const { token, secret } = req.body;
    const decodedSecret = OTPAuth.Secret.fromBase32(secret);
  
    let totp = new OTPAuth.TOTP({
      issuer: "Biolab",
      label: "azzuhry",
      algorithm: "SHA1",
      digits: 6,
      period: 300,
      secret: decodedSecret,
    });
    const delta = totp.validate({ token, window: 1 });
  
    try {
      if (delta == null) {
        res.status(400).json({ message: "doctor token is invalid or expired" });
      } else {
        let seconds = totp.period - (Math.floor(Date.now() / 1000) % totp.period);
        res.status(200).json({ message: "doctor token is valid", data: seconds });
      }
    } catch (error) {
      res.status(500).json({ message: "error occurred", data: error });
    }
}

const resetDoctorPassword = async (req, res) => {
    const doctorID = req.params.id;
    const { password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const result = await Doctor.update(
        { password: hashedPassword },
        { where: { id_doctor: doctorID } }
      );
  
      res.status(200).json({ message: "doctor password updated", data: result });
    } catch (error) {
      res.status(500).json({ message: "error occurred", data: error });
    }
}

// doctor email reset mechanism

// end of password reset mechanism
module.exports = {
    loginHospital,
    createHospital,
    editHospital,
    deleteHospital,
    getDoctor,
    createDoctor,
    editDoctor,
    deleteDoctor,
    resetHospitalOTP,
    validateHospitalOTP,
    resetHospitalPassword,
    resetDoctorOTP,
    validateDoctorOTP,
    resetDoctorPassword
};
