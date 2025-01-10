require("dotenv").config();

const { Doctor } = require("../../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const loginDoctor = async (req, res) => {
  const { doctorEmail, doctorPassword } = req.body;

  try {
    const account = await Doctor.findOne({ where: { doctor_email: doctorEmail } });

    if (!account) {
      res.status(404).json({ message: "doctor account not found" });
    }

    const matchedPassword = await bcrypt.compare(
      doctorPassword,
      account.doctor_password
    );

    if (!matchedPassword) {
      res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id_doctor: account.id_doctor, doctor_name: account.doctor_name },
      SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    const doctorObject = {
      information: account,
      token: token,
    };

    res
      .status(200)
      .json({ message: "Doctor Login Successful", doctorData: doctorObject });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports = {
    loginDoctor,
};
