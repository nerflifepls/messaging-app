const nodemailer = require("nodemailer");
const customConfig = require("../customConfig.json");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: customConfig.email,
    pass: customConfig.password,
  },
});

module.exports.transporter = transporter;

module.exports.sendEmail = async function (mailOptions) {
  try {
    await transporter.sendMail({
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
    });
    return {internalCode: 212}
  } catch (err) {
    return {internalCode: 104}
  }
};
