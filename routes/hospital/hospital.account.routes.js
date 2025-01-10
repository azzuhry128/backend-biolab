const express = require("express");

const { auth } = require("../../middleware/auth.middleware");
const { loginHospital, createHospital, editHospital, deleteHospital, createDoctor, editDoctor, deleteDoctor, getDoctor } = require("../../controllers/hospital/hospital.controller.account");
const { getAllService, createService, editService, deleteService } = require("../../controllers/hospital/hospital.controller.services");
const { getAllCategory } = require("../../controllers/hospital/hospital.controller.category");
const router = express.Router();

// hospital account 
router.post("/account/login", loginHospital);
router.post("/account/create", createHospital);
router.put("/account/update/:id", auth, editHospital);
router.delete("/account/delete/:id", auth, deleteHospital);

// hospital doctor CRUD
router.post("/doctor/create", auth, createDoctor);
router.put("/doctor/update/:id", auth, editDoctor);
router.delete("/doctor/delete/:id", auth, deleteDoctor);

// hospital service CRUD
router.post("/service/create", createService);
router.put("/service/update/:id", auth, editService);
router.delete("/service/delete/:id", auth, deleteService);

// hospital data
router.get("/visit/data", auth);
router.get("/doctor/data/:id", auth, getDoctor)
router.get("/service/data/:id", auth,getAllService)
router.get("/category/data", auth, getAllCategory);

module.exports = router;
