const {
  addUser,
  getUser,
  getUserInGame,
  removeUser,
  removeUserByUsername,
  getUserByUsername,
} = require("../utils/User")

const joinGame = function (socket, io) {
  socket.on("join", ({ username, game }, callback) => {
    const { user } = addUser({ id: socket.id, username, game }).then(() => {
      socket.emit("message", {
        username: "Admin",
        message: `${username},welcome to ${game}`,
      })

      socket.broadcast.to(game).emit("message", {
        username: "Admin",
        message: `${username} has joined to ${game}`,
      })

      socket.join(game)
      io.to(game).emit("updateUserList", getUserInGame(game))
    })
  })
}

const sendMessage = function (socket, io) {
  socket.on("sendMessage", ({ username, message }, callback) => {
    const user = getUserByUsername(username)
    io.to(user.game).emit("message", {
      username: user.username,
      message,
    })

    callback()
  })
}

const paint = function (socket, io) {
  socket.on("paint", (options, callback) => {
    const { line, username, color, size } = options
    const user = getUser(socket.id)
    io.emit("draw", {
      username,
      line,
      color,
      size,
    })

    callback()
  })
}

const disconnect = function (socket, io) {
  socket.on("leave", ({ username }) => {
    const user = removeUserByUsername(username)
    if (user) {
      io.to(user.game).emit("message", {
        username: "Admin",
        message: `${user.username} has left the ${user.game}`,
      })
      io.to(user.game).emit("updateUserList", getUserInGame(user.game))
    }
  })
}

module.exports = { joinGame, sendMessage, disconnect, paint }
