module.exports = Object.freeze({

	ERROR: Object.freeze({
		UNAUTHORIZED: {
			code: 401,
			text: 'Username or Password is incorrect',
			info: 'Authorization',
		},
		INVALID_PARAMS: {
			code: 422,
			text: 'Invalid parameter',
			info: 'Validation',
		},
	}),
	ENUMS: {
		FEEDBACK_CATEGORY: ['CAT1', 'CAT2', 'CAT3'],
	},
	VALIDATION_TYPE:{
		INVALID:'invalid',
		REQUIRED:'required'
	}
});
