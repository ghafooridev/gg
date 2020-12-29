const nodemailer = require("nodemailer");
const Promise = require("es6-promise").Promise;
const feedbackTemplate = require("./template/feedbackTemplate");
const activationRegisterTemplate = require("./template/activationRegisterTemplate");
const activationPasswordTemplate = require("./template/activationPasswordTemplate");

exports.sendMail = function (mailTypes, options) {
  const user = "ggchat1234@gmail.com";
  const pass = "lxhuabxcoqtmcdjg";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
  return new Promise((resolve, reject) => {
    const mailOptions = {};
    const types = {
      feedback: () => {
        const { sender, category, description } = options;
        mailOptions.from = sender;
        mailOptions.to = user;
        mailOptions.subject = `GG Chat Feedback from ${sender}`;
        mailOptions.html = feedbackTemplate(category, description);
      },
      activationRegister: () => {
        const { name, host, email, token } = options;
        mailOptions.from = user;
        mailOptions.to = email;
        mailOptions.subject = `Activation Email From GG Chat`;
        mailOptions.html = activationRegisterTemplate(name, host, email, token);
      },
      activationPassword: () => {
        const { name, host, email, token } = options;
        mailOptions.from = user;
        mailOptions.to = email;
        mailOptions.subject = `Activation Password Email From GG Chat`;
        mailOptions.html = activationPasswordTemplate(name, host, email, token);
      },
    };
    if (types[mailTypes]) {
      types[mailTypes]();
      transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, info);
        if (error) {
          return reject(error);
        }
        return resolve(info.response);
      });
    }
  });
};
