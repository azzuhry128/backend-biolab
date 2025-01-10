require("dotenv").config();
const { Service } = require("../../models");
const { Category } = require("../../models");
// hospital account CRUD
const getAllService = async (req,res) => {
    const hospitalID = req.params.id;
    try {
        const result = await Service.findAll({ where: { id_hospital: hospitalID } });
        return res.status(200).json(result);
    } catch (error) {
        console.log("error occured:", error);
    }
}
const createService = async (req, res) => {
    const { hospitalID, serviceName, serviceCategory, serviceDescription, serviceFee } = req.body;

    const categoryID = await Category.findOne({ where: { category_name: serviceCategory } });
    console.log(categoryID);
    console.log(categoryID.category_name)
    console.log(serviceName)
    console.log(serviceDescription)
    console.log(serviceFee)
    try {
        const result = await Service.create({
            id_hospital: hospitalID,
            id_category: categoryID.id_category,
            service_name: serviceName,
            service_description: serviceDescription,
            service_fee: serviceFee
        });
    
        return res.status(200).json(result);
    } catch (err) {
        console.log("error occured:", err);
    }
};

const editService = async (req, res) => {
    const serviceID = req.params.id;
    const { categoryID, serviceName, serviceDesc, serviceFee } = req.body;

    try {
        const result = await Service.update({
            id_category: categoryID,
            service_name: serviceName,
            service_description: serviceDesc,
            service_fee: serviceFee
        }, {where: { id_service: serviceID }});
        return res.status(200).json(result);
    } catch (err) {
        console.log("error occured:", err);
    }
};

const deleteService = async (req, res) => {
    try {
        const serviceID = req.params.id;
    
        const result = await Service.destroy({ where: { id_sevice: serviceID } });
    
        return res.status(200).json({ message: "service deleted", target: result });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllService,
    createService,
    editService,
    deleteService
};
