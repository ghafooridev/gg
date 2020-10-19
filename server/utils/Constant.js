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
		FEEDBACK_CATEGORY: ['Report a bug', 'Experience Issue', 'Business Inquiry','Other'],
	},
	VALIDATION_TYPE:{
		INVALID:'invalid',
		REQUIRED:'required'
	}
});
