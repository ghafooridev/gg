const nodemailer = require('nodemailer');
const Promise = require('es6-promise').Promise;
const feedbackTemplate = require('./template/feedbackTemplate');
const activationTemplate = require('./template/activationTemplate');

exports.sendMails = function (mailTypes, options) {
	const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'ghafooridev@gmail.com',
				pass: 'ghafoori123'
			}
		});

	return new Promise((resolve, reject) => {
		const mailOptions = {};
		const types = {
			feedback: () => {
				const {sender, category, description} = options;
				mailOptions.from = sender;
				mailOptions.to = 'ghafooridev@gmail.com';
				mailOptions.subject = `GG Chat Feedback from ${name}`;
				mailOptions.html = feedbackTemplate(category, description);
			},
			activation: () => {
				const {name, host, email, token} = options;
				mailOptions.from = 'ghafooridev@gmail.com';
				mailOptions.to = email;
				mailOptions.subject = `Activation Email From GG Chat`;
				mailOptions.html = activationTemplate(name, host, email, token);
			}
		}
		if (types[mailTypes]) {
			types[mailTypes]();

			transporter.sendMail(mailOptions, function (error, info) {
				console.log('???', error, info)

				if (error) {
					console.log('>>>>>>>', error);
					return reject(error)
				} else {
					console.log('Email sent: ' + info.response);
					return resolve(info.response)
				}

			});
		}
	})
}