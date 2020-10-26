const User = require('../models/User');
const Token = require('../models/Token');
const Constant = require('../utils/Constant');
const checkValidFeedback = require('../validations/User');

exports.confirmationEmail = function (req, res) {
	Token.findOne({token: req.params.token}, function (err, token) {
		if (!token) {
			return res.status(400).json(Constant.MESSAGES.INVALID_ACTIVATION_LINK);
		}

		User.findOne({_id: token._userId, email: req.params.email}, function (err, user) {
			if (!user) {
				return res.status(400).json(Constant.MESSAGES.USER_NOT_FOUND);
			}
			// user is already verified
			else if (user.isVerified) {
				return res.redirect(`http://localhost:3000`)
			}
			// verify user
			else {
				user.isVerified = true;
				user.save(function (err) {

					if (err) {
						return res.status(400).json(err);
					}

					return res.redirect('http://localhost:3000')
				});
			}
		});
	});
}


exports.registerController = (req, res) => {

	const {isValid} = checkValidFeedback(req.body);
	const {name, username, password, email, university, description} = req.body;

	if (!isValid) {
		return res.status(422).json(Constant.ERROR.INVALID_PARAMS);
	}

	User.findOne(user=>user.email===email).then()

	const newUser = {
		name, username, password, email, university, description
	};

	return User.create(newUser)
		.then(() => {
			res.json(true);
			sendMail('feedback', {name, email, category, description})
		})
		.catch(err => {
			res.status(400).json(err);
		});
},


const {name, username, email, password, university} = req.body;
const errors = validationResult(req);

if (!errors.isEmpty()) {
	const firstError = errors.array().map(error => error.msg)[0];
	return res.status(422).json({
		errors: firstError
	});
} else {
	User.findOne({
		email: email
	}).exec((err, user) => {
		if (user) {
			return res.status(400).json({
				errors: 'Email is taken'
			});
		} else {
			const user = new User({
				name: name,
				username: username,
				email: email,
				password: password,
				university: university
			});

			user.save((err, user) => {
				if (err) {
					console.log('Save error', errorHandler(err));
					return res.status(401).json({
						errors: errorHandler(err)
					});
				} else {
					EmailActivationToken(user, req, res);
					return res.status(200).json({
						success: true,
						userObj: user,
						message: 'Signup success'
					});
				}
			});
		}
	});
}