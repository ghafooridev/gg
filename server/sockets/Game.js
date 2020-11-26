const {
  addUser,
  getAllUsers,
  removeUserByUsername,
  getUserByUsername,
  getUserTurnByUsername,
  updateUsersAfterTurn,
  updateUserPoint,
  getUserById,
} = require("../utils/User")

const joinGame = function (socket, io) {
  socket.on("join.room", ({ username, room, id }, callback) => {
    const newUser = {
      id,
      username,
      room,
      place: "game",
      NOP: 0,
      point: 0,
    }
    const { user } = addUser(newUser).then(() => {
      socket.join(room)
      socket.to(room).broadcast.emit("userConnected.room", newUser)
      io.to(room).emit("users.room", newUser, getAllUsers(room, "game"))
      if (typeof callback === "function") {
        callback(newUser)
      }
    })
  })
}

const guessGame = function (socket, io) {
  socket.on("guess.room", ({ username, message }, callback) => {
    const user = getUserByUsername(username, "game")
    if (user) {
      io.to(user.room).emit("guess", {
        username: user.username,
        message,
      })
    }
  })
}

const removeGuess = function (socket, io) {
  socket.on("guessRemove.room", ({ room }, callback) => {
    io.to(room).emit("guessRemove.room")
  })
}

const paintGame = function (socket, io) {
  socket.on("paint.room", (options, callback) => {
    const { line, username, color, size, clear } = options
    // const user = getUser(socket.id)
    io.emit("draw", {
      username,
      line,
      color,
      size,
      clear,
    })

    callback()
  })
}

const selectWord = function (socket, io) {
  socket.on("wordSelect.room", (word, callback) => {
    io.emit("wordShow.room", word)
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getUsersTurn = function (socket, io) {
  socket.on("usersTurn.room", (preTurn, callback) => {
    io.emit("usersTurn.room", getUserTurnByUsername(preTurn))
    if (typeof callback === "function") {
      callback()
    }
  })
}

const updateUsers = function (socket, io) {
  socket.on("usersUpdate.room", ({ room, turn }) => {
    io.emit("usersUpdate.room", updateUsersAfterTurn(room, "game", turn))
  })
}

const updatePoints = function (socket, io) {
  socket.on("usersUpdatePoint.room", ({ room, username }) => {
    io.emit("usersUpdatePoint.room", updateUserPoint(room, "game", username))
  })
}

const showResult = function (socket, io) {
  socket.on("showResult.room", (callback) => {
    io.emit("showResult.room")
    if (typeof callback === "function") {
      callback()
    }
  })
}

const hideResult = function (socket, io) {
  socket.on("hideResult.room", (callback) => {
    io.emit("hideResult.room")
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getCurrentUser = function (socket, io) {
  socket.on("getCurrentUser.room", ({ room, username }, callback) => {
    io.emit("getCurrentUser.room", getUserByUsername(username, "game"))
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getCurrentUserById = function (socket, io) {
  socket.on("getInfo.room", (id) => {
    io.emit("getInfo.room", getUserById(id, "game"))
  })
}

const countDown = function (socket, io) {
  let counter = 60
  socket.on("timer.room", (word, callback) => {
    const timer = setInterval(() => {
      counter -= 1

      if (counter === 30) {
        const array = word.split("")
        const charIndex = Math.floor(Math.random() * array.length)
        io.emit("charShow.room", charIndex)
      }

      if (counter === 0) {
        counter = 60
        clearInterval(timer)
        return io.emit("timersUp.room")
      }
      io.emit("timer.room", counter)
    }, 1000)
  })
}

const leaveGame = function (socket, io) {
  socket.on("leave.room", ({ username, room, id }) => {
    const user = removeUserByUsername(username, "game")
    if (user) {
      socket.to(room).broadcast.emit("userDisConnected.room", id)
      io.to(user.room).emit("users.room", getAllUsers(user.room, "game"))
    }
  })
}

const selectWordTimer = function (socket, io) {
  let counter = 20
  socket.on("wordSelectTimer.room", (callback) => {
    const timer = setInterval(() => {
      counter -= 1

      if (counter === 0) {
        counter = 20
        clearInterval(timer)
        return io.emit("wordSelectTimerUp.room")
      }
      io.emit("wordSelectTimer.room", counter)
    }, 1000)
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
  hideResult,
  removeGuess,
  updatePoints,
  countDown,
  getCurrentUser,
  getCurrentUserById,
  selectWordTimer,
}
