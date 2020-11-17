const Chat = require("../models/Chat")

const {
  addUser,
  getAllUsers,
  removeUserByUsername,
  getUserByUsername,
  getUserTurnByUsername,
  updateUsersAfterTurn,
} = require("../utils/User")

const joinGame = function (socket, io) {
  socket.on("join.game", ({ username, game }, callback) => {
    const { user } = addUser({
      id: socket.id,
      username,
      game,
      place: "game",
      NOP: 0,
    }).then(() => {
      socket.join(game)
      io.to(game).emit("users.game", getAllUsers(game, "game"))
    })
  })
}

const guessGame = function (socket, io) {
  socket.on("guess.game", ({ username, message }, callback) => {
    const user = getUserByUsername(username, "game")
    if (user) {
      io.to(user.game).emit("guess", {
        username: user.username,
        message,
      })
    }
  })
}

const paintGame = function (socket, io) {
  socket.on("paint.game", (options, callback) => {
    const { line, username, color, size } = options
    // const user = getUser(socket.id)
    io.emit("draw", {
      username,
      line,
      color,
      size,
    })

    callback()
  })
}

const selectWord = function (socket, io) {
  socket.on("wordSelect.game", (word, callback) => {
    io.emit("wordShow.game", word)
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getUsersTurn = function (socket, io) {
  socket.on("usersTurn.game", (callback) => {
    io.emit("usersTurn.game", getUserTurnByUsername())
    if (typeof callback === "function") {
      callback()
    }
  })
}

const updateUsers = function (socket, io) {
  socket.on("usersUpdate.game", ({ game, turn }) => {
    io.emit("usersUpdate.game", updateUsersAfterTurn(game, "game", turn))
  })
}

const showResult = function (socket, io) {
  socket.on("showResult.game", (callback) => {
    io.emit("showResult.game")
    if (typeof callback === "function") {
      callback()
    }
  })
}

const hideResult = function (socket, io) {
  socket.on("hideResult.game", (callback) => {
    io.emit("hideResult.game")
    if (typeof callback === "function") {
      callback()
    }
  })
}

const leaveGame = function (socket, io) {
  socket.on("leave.game", ({ username }) => {
    const user = removeUserByUsername(username, "game")
    if (user) {
      io.to(user.game).emit("users.game", getAllUsers(user.game, "game"))
    }
  })
}

module.exports = {
  joinGame,
  guessGame,
  paintGame,
  leaveGame,
  selectWord,
  showResult,
  getUsersTurn,
  updateUsers,
  hideResult
}
