const mongoose = require('../db');
const Socket = require('../models/Socket');
const Room = require('../models/Room');
const Lobby = require('../models/Lobby');

const util = require('../util');
const { gameSizes, ROOM_ID_LEN } = require('../config');

// add user to room users array
function addUserRoom(roomId, userId) {
  Room.findOneAndUpdate({ roomId: roomId }, { $push: { users: userId }, $inc: { userCount: 1 } }, 
    (err, doc, res) => {
      if (err) console.error("Error appending to room users list: ", err);
  })
}

// add user to lobby users array
function addUserLobby(lobbyId, userId, lobbyFullCallback, game) {
  Lobby.findOneAndUpdate({ lobbyId: lobbyId }, { $push: { users: userId }, $inc: { userCount: 1 } }, 
    { new: true },
    (err, doc, _) => {
      if (err) console.error("Error appending to lobby users list: ", err);

      // if lobby is now full
      if (doc.userCount === gameSizes[doc.game]) {

        // create new game room
        let roomId = "";
        util.generateUniqueId(Room, "roomId", ROOM_ID_LEN).then(id => {
          roomId = id;

          // emit socket event to all users in lobby
          lobbyFullCallback(roomId);

          const room = new Room({
            _id: new mongoose.Types.ObjectId(),
            roomId: roomId,
            users: [],
            game: game
          });
        
          room.save(err => {
            if (err) return console.error(err);
          });

          // remove lobby from database
          removeLobby(lobbyId);
        });
      }
  });

  // check if lobby has sufficient players to start game
}

// socket Id => room Id
async function getSocketRoom(socketId) {
  const doc = await Socket.findOne({ socketId: socketId }).exec();
  if (doc) return doc.roomId;
  
  console.error("Failed to find socket object: ", socketId);
  return null;
}

// store room Id 
function setSocketRoom(socketId, roomId, userId) {
  console.log("setting socket object: ", socketId);
  
  const socketObj = new Socket({
    _id: new mongoose.Types.ObjectId(),
    socketId: socketId,
    roomId: roomId,
    userId: userId
  });

  socketObj.save(err => {
    if (err) console.error(err);
  });
}

// delete socketToRoom[socket.id]
function removeSocketObject(socketId) {
  Socket.findOneAndDelete({ socketId: socketId }, (err, doc) => {
    if (err) console.error("Socket Object deleted failed: ", err);
    if (!doc) return;

    const userId = doc.userId;
    const roomId = doc.roomId;

    // remove user from lobby or room users
    if (roomId.length == ROOM_ID_LEN) {
      Room.findOneAndUpdate({ roomId: roomId }, { $pullAll: { users: [userId] }, $inc: { userCount: -1 }}, 
        (err, _, ___) => {
          if(err) console.error(err);
        });
    } else {
      Lobby.findOneAndUpdate({ lobbyId: roomId }, { $pullAll: { users: [userId] }, $inc: { userCount: -1 }}, 
        (err, _, ___) => {
          if(err) console.error(err);
        });
    }
  });

}

// delete lobby 
function removeLobby(lobbyId) {
  Lobby.findOneAndDelete({ lobbbyId: lobbyId }, (err, _) => {
    if (err) console.error("Error deleting lobby: ", err);
  })
}

// remove all rooms that have no users
function removeInactiveRooms() {
  Room.deleteMany({ userCount: { $eq: 0 } });
}

// store message in databse
function storeChatMessage(message, sender, isRoom, id) {
  console.log("In store chat message with params: ", message, sender, isRoom, id);
  const messageObj = {
    text: message,
    sender: sender
  }

  if (isRoom) {
    Room.findOneAndUpdate({ roomId: id }, { $push: { messages: messageObj }},
      (err, _, __) => {
        console.error("Error updating room with new message: ", err);
      });
  } else {
    Lobby.findOneAndUpdate({ lobbyId: id }, { $push: { messages: messageObj }},
      (err, _, __) => {
        console.error("Error updating lobby with new message: ", message);
      });
  }
} 

module.exports = {
  getSocketRoom: getSocketRoom,
  setSocketRoom: setSocketRoom,
  removeSocketObject: removeSocketObject,
  addUserRoom: addUserRoom,
  addUserLobby: addUserLobby,
  removeInactiveRooms: removeInactiveRooms,
  storeChatMessage: storeChatMessage
}