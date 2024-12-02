const patientRequestLogger = async (req, res, next) => {
  const method = req.method;
  const url = req.url;

  console.log({
    origin: "patient",
    method: method,
    url: url,
  });
  next();
};

const responseLogger = async (req, res, next) => {
  res.send = (body) => {
    console.log("Response body", body);
  };

  next();
};

module.exports = { patientRequestLogger, responseLogger };
