var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String,
  active: { type: Boolean, default: true },
  inQueue: { type: Boolean, default: false },
  inGame: { type: Boolean, default: false }
}, { collection: "users" });

const User = mongoose.model("User", userSchema);

module.exports = User;