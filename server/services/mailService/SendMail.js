const nodemailer = require('nodemailer');

const feedbackTemplate = require('./template/feedbackTemplate');

exports.sendMail = function (name, sender, category, description) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.AUTH_EMAIL_USER,
			pass: process.env.AUTH_EMAIL_PASS
		}
	});

	const mailOptions = {
		from: sender,
		to: process.env.AUTH_EMAIL_USER,
		subject: `GG Chat Feedback from ${name}`,
		html: feedbackTemplate(category, description),
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log('>>>>>>>', error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}