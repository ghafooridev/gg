const User = require('../models/User');
const Token = require('../models/Token');
const Constant = require('../utils/Constant')

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