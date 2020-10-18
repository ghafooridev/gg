const nodemailer = require('nodemailer');

exports.sendMail=function (name,sender,description) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'ghafooridev@gmail.com',
			pass: 'ghafoori123'
		}
	});

	const mailOptions = {
		from: sender,
		to: 'stackjsco@gmail.com',
		subject: `GG Chat Feedback from ${name}`,
		text: description
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log('>>>>>>>', error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}