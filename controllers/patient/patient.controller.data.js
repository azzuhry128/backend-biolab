require("dotenv").config();

const { Category } = require("../../models");
const { HospitalAccount } = require("../../models");
const { Service } = require("../../models");
const { Doctor } = require("../../models");

const getCategoryData = async (req, res) => {
    try {
    const categories = await Category.findAll();

    res
      .status(200)
      .json({ message: "Category fetch success", categories: categories });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const getHospitalRelatedToCategory = async(req,res) => {
  const categoryID = req.params.id;
  try {
    const hospitals = await HospitalAccount.findAll({
      include: [
        {
          model: Service,
          where: {id_category: categoryID},
          attributes: [],
          include: [
            {
              model: Category,
              attributes: []
            }
          ]
        }
      ]
    })

    res.status(200).json({ message: "Hospital fetch success", hospitals: hospitals });
  } catch (error) {
    console.log('query error', error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

const getServiceDetail = async(req,res) => {
    try {
        const hospitalID = req.params.hospitalID;
        const categoryID = req.params.categoryID;
        const service = await Service.findOne({ where: { id_hospital: hospitalID, id_category: categoryID } });

        res
          .status(200)
          .json({ message: "service fetch success", data: service });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getHospitalDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({where : {id_hospital: req.params.id}});

    res
      .status(200)
      .json({ message: "Doctors fetch success", doctors: doctors });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}


// end of password reset mechanism
module.exports = {
  getCategoryData,
  getHospitalRelatedToCategory,
  getServiceDetail,
  getHospitalDoctors,
}
