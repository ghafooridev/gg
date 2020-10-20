var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const { SALT_WORK_FACTOR } = require('../config');

var Schema = mongoose.Schema;

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

userSchema.pre('save', function (next) {
	var user = this;

	// only hash the password if it is has been modifier (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password using new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
