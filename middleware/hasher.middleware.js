const bcrypt = require("bcrypt");
const passwordHasher = async (req, res, next) => {
  if (!req.body.password) {
    next();
  }

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
  } catch (error) {
    next(error);
  }
};

const comparePassword = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const patient = await Patien
  } catch (error) {
    
  }
};

module.exports = { passwordHasher };
