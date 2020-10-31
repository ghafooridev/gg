export const validationMessage = function (name, type, value) {
	const types = {
		required: `${name} is required`,
		minLength: `${name} should be minimum ${value} characters`,
		maxLength: `${name} should be maximum ${value} characters`,
		pattern: `${name} does not correct`,
	}

	if (types[type]) {
		return types[type]
	}
}