const mongoose = require("mongoose")

const Schema = mongoose.Schema

var userSchema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, index: { unique: true } },
		password: { type: String, required: true },
		email: { type: String, required: true },
		university: { type: String, required: true },
		description: { type: String, required: false },
		active: { type: Boolean, default: true },
		inQueue: { type: Boolean, default: false },
		inGame: { type: Boolean, default: false },
		isVerified: { type: Boolean, default: false }
	},
	{ collection: 'users' }
);


const User = mongoose.model("User", userSchema)
module.exports = User
