const mongoose = require('./db');
const Socket = require('./models/Socket');
const Room = require('./models/Room');

// add user to room users array
function addUserRoom(roomId, userId) {
  Room.findOneAndUpdate({ roomId: roomId }, { $push: { users: userId }, $inc: { userCount: 1 } }, 
    (err, doc, res) => {
      if (err) console.error("Error appending to room users list: ", err);
  })
}

// socket Id => room Id
async function getSocketRoom(socketId) {
  const doc = await Socket.findOne({ socketId: socketId }).exec();
  return doc.roomId;
}

// store room Id 
function setSocketRoom(socketId, roomId) {
  const socketObj = new Socket({
    _id: new mongoose.Types.ObjectId(),
    socketId: socketId,
    roomId: roomId
  });

  socketObj.save(err => {
    if (err) return console.error(err);
  });
}

// delete socketToRoom[socket.id]
function removeSocketObject(socketId) {
  Socket.findOneAndDelete({ socketId: socketId }, (err, _) => {
    if (err) console.error("Socket Object deleted failed: ", err)
  })
}

// store message in databse
function storeChatMessage(message, sender, isRoom, id) {

} 

module.exports = {
  getSocketRoom: getSocketRoom,
  setSocketRoom: setSocketRoom,
  removeSocketObject: removeSocketObject,
  addUserRoom: addUserRoom
}