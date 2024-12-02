const OTPAUTH = require("otpauth");

const secret = new OTPAUTH.Secret({ size: 20 });

const totp = new OTPAUTH.TOTP({
  issuer: "Biolab",
  label: "azzuhry",
  algorithm: "SHA1",
  digits: 6,
  period: 120,
  secret: secret,
});

const generateOTP = (req, res, next) => {
  const token = totp.generate();
  req.body.token = token;
  next();
};

const validateOTP = (req, res, next) => {
  const { token } = req.body;
  const delta = totp.validate({ token, window: 1 });

  if (delta == null) {
    res.status(400).json({ message: "token is invalid or expired" });
    next();
  }

  const remainingTime =
    totp.period - (Math.floor(Date.now() / 1000) % totp.period);
  req.body.remainingTime = remainingTime;
  next();
};

module.exports = { generateOTP, validateOTP };
