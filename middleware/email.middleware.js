require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

const emailServiceID = process.env.EMAIL_SERVICE_ID;
const emailTemplateID = process.env.EMAIL_TEMPLATE_ID;
const emailPublicKey = process.env.EMAIL_PUBLIC_KEY;
const emailPrivateKey = process.env.EMAIL_PRIVATE_KEY;

const sendEmail = async (req, res) => {
  const { to_name, to_email, token } = req.body;

  const templateParams = {
    from_name: "Biolab",
    to_name: to_name,
    to_email: to_email,
    message: token,
  };

  emailjs.init({
    publicKey: emailPublicKey,
    privateKey: emailPrivateKey,
  });

  emailjs.send(emailServiceID, emailTemplateID, templateParams).then(
    (response) => {
      console.log("Email sent successfully", response);
      res
        .status(200)
        .json({ message: "Email sent successfully", data: response });
    },
    (error) => {
      console.log("Error sending email", error);
      res.status(500).json({ message: "Error sending email", data: error });
    }
  );
};
module.exports = { sendEmail };
