const express = require("express");

const { auth } = require("../../middleware/auth.middleware");
const router = express.Router();

router.get("/account", auth);
router.post("/account/create", auth);
router.put("/account/update/:id", auth);
router.delete("/account/delete/:id", auth);



module.exports = router;
