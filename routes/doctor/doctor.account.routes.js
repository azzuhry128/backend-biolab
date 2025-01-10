const express = require("express");

const { auth } = require("../../middleware/auth.middleware");
const router = express.Router();

// doctor account
router.get("/account", auth);
router.put("/account/update/:id", auth);

// doctor finish transaction mechanism
// doctor live data transmitting using socket IO


module.exports = router;
