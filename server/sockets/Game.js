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

let round = 0
let isPlaying = false
let turnedUser = ""
let counter = 0
let timer
let selectWordCounter

const joinGame = function (socket, io) {
  socket.on("join.room", ({ username, room, id }, callback) => {
    const newUser = {
      socketId: socket.id,
      id,
      username,
      room,
      place: "game",
      NOP: 0,
      point: 0,
      // round:1
    }

    const { user } = addUser(newUser).then(() => {
      socket.join(room)

      socket.to(room).broadcast.emit("userConnected.room", newUser)

      io.to(room).emit(
        "users.room",
        isPlaying,
        newUser,
        getAllUsers(room, "game")
      )

      socket.broadcast.to(room).emit("message.game", {
        username: "GG BOT",
        message: `${username} has joined to this game`,
      })

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
    isPlaying = true
    io.emit("isPlaying.room", isPlaying)
    round += 1
    io.emit("wordShow.room", { word, round })
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getUsersTurn = function (socket, io) {
  socket.on("usersTurn.room", ({ room, nextTurn }, callback) => {
    turnedUser = getUserTurnByUsername(room, nextTurn)
    io.emit("usersTurn.room", {
      isPlaying,
      nextTurn: turnedUser,
    })
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
  socket.on("usersUpdatePoint.room", ({ room, round, guessedUser }) => {
    io.emit(
      "usersUpdatePoint.room",
      updateUserPoint(room, round, "game", guessedUser)
    )
  })
}

const guessAllCorrectly = function (socket, io) {
  socket.on("guessAllCorrectly.room", () => {
    counter = 60
    clearInterval(timer)
    io.emit("timersUp.room")
  })
}

const showResult = function (socket, io) {
  socket.on("showResult.room", (callback) => {
    isPlaying = false
    io.emit("showResult.room")
    io.emit("isPlaying.room", isPlaying)
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
  socket.on("timer.room", (word, callback) => {
    counter = 60
    timer = setInterval(() => {
      counter -= 1

      if (counter === 30) {
        const array = word.split("")
        const charIndex = Math.floor(Math.random() * array.length)
        io.emit("charShow.room", charIndex)
      }

      if (counter === 0) {
        counter = 60
        selectWordCounter = 20
        clearInterval(timer)
        return io.emit("timersUp.room")
      }
      io.emit("timer.room", { timer: counter, word, turnedUser })
    }, 1000)
  })
}

const leaveGame = function (socket, io) {
  socket.on("leave.room", ({ username, room, id }) => {
    const user = removeUserByUsername(username, "game")

    if (user) {
      socket.to(room).broadcast.emit("userDisConnected.room", {
        userId: id,
      })

      if (username === turnedUser) {
        counter = 60
        clearInterval(timer)
        io.emit("timersUp.room")
      }

      io.to(user.room).emit(
        "users.room",
        isPlaying,
        user,
        getAllUsers(user.room, "game")
      )

      io.to(room).emit("message.game", {
        username: "GG BOT",
        message: `${username} has left from this game`,
      })

      io.to(user.room).emit("disconnect")
    }
  })
}

const selectWordTimer = function (socket, io) {
  socket.on("wordSelectTimer.room", (callback) => {
    selectWordCounter = 20
    const selectWordTime = setInterval(() => {
      selectWordCounter -= 1

      if (selectWordCounter === 0) {
        selectWordCounter = 20
        clearInterval(selectWordTime)
        return io.emit("wordSelectTimerUp.room")
      }
      io.emit("wordSelectTimer.room", selectWordCounter)
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
  guessAllCorrectly,
}
