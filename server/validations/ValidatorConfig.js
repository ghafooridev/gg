const empty = require('lodash.isempty');

const setToString = value => {
	return !empty(value) ? value : '';
};

const validationMessage = (name, type) => {
	return `${name} is ${type}`
}

module.exports = {setToString,validationMessage};
