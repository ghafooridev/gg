const Chat = require("../models/Chat")

const {
  addUser,
  getAllUsers,
  removeUserByUsername,
  getUserByUsername,
} = require("../utils/User")

const joinLobby = function (socket, io) {
  socket.on("join.lobby", ({ username, game }, callback) => {
    const newUser = {
      id: socket.id,
      username,
      game,
      place: "lobby",
    }
    const { user } = addUser(newUser).then(() => {
      socket.emit("message", {
        username: "GG BOT",
        message: `${username},welcome to ${game}`,
      })

      socket.broadcast.to(game).emit("message", {
        username: "GG BOT",
        message: `${username} has joined to ${game}`,
      })

      socket.join(game)
      io.to(game).emit("users.lobby", getAllUsers(game, "lobby"))
    })
  })
}

const chatLobby = function (socket, io) {
  socket.on("chat.lobby", ({ username, message }, callback) => {
    const user = getUserByUsername(username,"lobby")
    if (user) {
      io.to(user.game).emit("message", {
        username: user.username,
        message,
      })

      const newChat = new Chat({
        username,
        message,
        game: user.game,
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
      io.to(user.game).emit("message", {
        username: "GG BOT",
        message: `${user.username} has left the ${user.game}`,
      })
      io.to(user.game).emit("users.lobby", getAllUsers(user.game, "lobby"))
    }
  })
}

module.exports = { joinLobby, chatLobby, leaveLobby }
