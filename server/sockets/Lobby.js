const Chat = require("../models/Chat")

const {
  addUser,
  getAllUsers,
  removeUserByUsername,
  getUserByUsername,
} = require("../utils/User")

const joinLobby = function (socket, io) {
  socket.on("join.lobby", ({ username, room }, callback) => {
    const newUser = {
      id: socket.id,
      username,
      room,
      place: "lobby",
    }
    const { user } = addUser(newUser).then(() => {
      socket.emit("message", {
        username: "GG BOT",
        message: `${username},welcome to this room`,
      })

      socket.broadcast.to(room).emit("message", {
        username: "GG BOT",
        message: `${username} has joined to this room`,
      })

      socket.join(room)
      io.to(room).emit("users.lobby", getAllUsers(room, "lobby"))
    })
  })
}

const chatLobby = function (socket, io) {
  socket.on("chat.lobby", ({ username, message }, callback) => {
    const user = getUserByUsername(username, "lobby")
    if (user) {
      io.to(user.room).emit("message", {
        username: user.username,
        message,
      })

      const newChat = new Chat({
        username,
        message,
        room: user.room,
      })

      newChat
        .save()
        .then(() => {
          callback()
        })
        .catch((error) => {})
    }
  })
}

const leaveLobby = function (socket, io) {
  socket.on("leave.lobby", ({ username }) => {
    const user = removeUserByUsername(username, "lobby")
    if (user) {
      io.to(user.room).emit("message", {
        username: "GG BOT",
        message: `${user.username} has left from this room`,
      })
      io.to(user.room).emit("users.lobby", getAllUsers(user.room, "lobby"))
    }
  })
}

const enterGame = function (socket, io) {
  socket.on("enterGame.lobby", ({ username, room }, callback) => {
    io.to(room).emit("enterGame.lobby", {
      username: "GG BOT",
      message: `${username}, entered the game `,
    })
  })
}

module.exports = { joinLobby, chatLobby, leaveLobby, enterGame }
