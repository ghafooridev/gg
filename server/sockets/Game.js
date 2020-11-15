const Chat = require("../models/Chat")

const {
  addUser,
  getUser,
  getUserInGame,
  removeUserByUsername,
  getUserByUsername,
} = require("../utils/User")

const joinGame = function (socket, io) {
  socket.on("join.game", ({ username, game }, callback) => {
    const { user } = addUser({ id: socket.id, username, game }).then(() => {

      socket.join(game)
      io.to(game).emit("users.game", getUserInGame(game))
    })
  })
}

const guessGame = function (socket, io) {
  socket.on("guess.game", ({ username, message }, callback) => {
    const user = getUserByUsername(username)
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

const paintGame = function (socket, io) {
  socket.on("paint.game", (options, callback) => {
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

const leaveGame = function (socket, io) {
  socket.on("leave.game", ({ username }) => {
    const user = removeUserByUsername(username)
    if (user) {
      io.to(user.game).emit("users.game", getUserInGame(user.game))
    }
  })
}

module.exports = { joinGame, guessGame, paintGame, leaveGame }
