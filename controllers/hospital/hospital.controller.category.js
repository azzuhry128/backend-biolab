require("dotenv").config();
const { Category } = require("../../models");

// hospital account CRUD
const getAllCategory = async (req,res) => {
    try {
        const result = await Category.findAll();
        return res.status(200).json(result);
    } catch (error) {
        console.log("error occured:", error);
    }
}

module.exports = {
    getAllCategory
};
