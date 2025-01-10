const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const port = 3000;

const patientRoutes = require("./routes/patient/patient.account.routes.js");
const hospitalRoutes = require("./routes/hospital/hospital.account.routes.js");

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json());
app.use("/", router);
app.use("/patient", patientRoutes);
app.use("/hospital", hospitalRoutes)

router.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app running on http://localhost:${port}`);
});
