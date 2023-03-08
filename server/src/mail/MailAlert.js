const nodemailer = require("nodemailer");
const Mailconfig = require('../config/Mailconfig')
const MailAlert = async function (
  ReceiverEmail = "",
  Note = "",
  Subject = "",
) {
  try {
    var transporter = nodemailer.createTransport(Mailconfig);

    var mailOptions = {
      from: "codyperform123@gmail.com",
      to: ReceiverEmail,
      subject: Subject,
      text: Note,
      html: Note
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("Error In MailAlert :", e);
  }
};

module.exports = MailAlert;