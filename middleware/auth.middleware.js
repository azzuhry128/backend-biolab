require("dotenv").config();

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const auth = async (req, res, next) => {

  const token = req.headers["authorization"].split(" ")[1];

  if (req.method == "GET") {
    return next();
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.patient = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { auth };
