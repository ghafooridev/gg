const mongoose = require('mongoose');

const Constant = require('../utils/Constant');

const {Schema} = mongoose;

const FeedbackSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	category: {
		type: String,
		enum: Constant.ENUMS.FEEDBACK_CATEGORY
	},
});

module.exports = mongoose.models.feedback || mongoose.model('feedback', FeedbackSchema);
