var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var socketSchema = new Schema({
  socketId: String,
  roomId:  String,
  userId: String,
  created: { type: Date, default: Date.now }
}, { collection: "sockets" });

const Socket = mongoose.model("Socket", socketSchema);

module.exports = Socket;