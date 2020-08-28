var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  roomId:  String,
  game: String,
  messages: { type: Array, default: [] },
  created: { type: Date, default: Date.now },
  creator: { type: String, default: "server" },
  active: { type: Boolean, default: true },
  users: Array,
}, { collection: "rooms" });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;