const validator = require('validator');

const empty = require('lodash.isempty');

const {setToString, validationMessage} = require('./ValidatorConfig');
const Constant = require('../utils/Constant')

module.exports = (data) => {
	const error = {};

	if (!validator.isEmail(setToString(data.email))) {
		error.email = validationMessage('email', Constant.VALIDATION_TYPE.INVALID);
	}
	if (validator.isEmpty(setToString(data.email))) {
		error.email = validationMessage('email', Constant.VALIDATION_TYPE.REQUIRED);
	}

	return {
		error,
		isValid: empty(error),
	};
};
