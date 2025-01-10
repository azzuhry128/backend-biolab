require("dotenv").config();

const { Visit } = require("../../models");

const SECRET_KEY = process.env.SECRET_KEY;

const visitDoctor = async (req, res) => {
    const visitID = req.params.id; 
  const { doctorEmail, doctorPassword } = req.body;

  try {
    const result = await Visit.update({ 
        status : "finished"
    },
    { where: { id_visit: visitID } });


    res
      .status(200)
      .json({ message: "Visitation is finished", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports = {
    visitDoctor,
};
