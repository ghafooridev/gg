var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lobbySchema = new Schema({
  lobbyId:  String,
  game: String,
  messages: Array,
  created: { type: Date, default: Date.now },
  creator: { type: String, default: "server" },
  active: { type: Boolean, default: true },
  users: Array,
}, { collection: "lobbys" });

const Lobby = mongoose.model("Lobby", lobbySchema);

module.exports = Lobby;