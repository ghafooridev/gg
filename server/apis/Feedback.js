const express = require('express');
const Feedback = require('../models/Feedback');
const checkValidFeedback = require('../validations/feedback');
const Constant = require('../utils/Constant');

const router = express.Router();
/*
//@route  Post api/feedback
//@desc   add feedback
//@access public
*/
router.post(
	'/',
	(req, res) => {

		const {isValid} = checkValidFeedback(req.body);
		const {name, email, description, category} = req.body;

		if (!isValid) {
			return res.status(422).json(Constant.ERROR.INVALID_PARAMS);
		}

		const newFeedback = {
			name,
			email,
			description,
			category
		};

		return Feedback.create(newFeedback)
		.then(() => {
			res.json(true);
		})
		.catch(err => {
			res.status(400).json(err);
		});
	},
);

module.exports = router;
