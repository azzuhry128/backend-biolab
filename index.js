const express = require("express");
const app = express();
const router = express.Router();
const port = 3000;

const patientRoutes = require("./routes/patient/patient.account.routes.js");

app.use(express.json());
app.use("/", router);
app.use("/patient", patientRoutes);
app.use("/hospital", )

router.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app running on port ${port}`);
});
