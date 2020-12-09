const {
  addUser,
  getAllUsers,
  removeUserByUsername,
  getUserByUsername,
  getUserTurnByUsername,
  updateUsersAfterTurn,
  updateUserPoint,
  getUserBySocketId,
} = require("../utils/User")

let round = 0
let isPlaying = false
let turnedUser = ""
let counter = 0
let timer
let selectWordCounter

const joinGame = function (socket, io) {
  socket.on("join.room", ({username, room}, callback) => {
    const newUser = {
      socketId: socket.id,
      username,
      room,
      place: "game",
      NOP: 0,
      point: 0,
      // round:1
    }

    const {user} = addUser(newUser).then(() => {
      socket.join(room)

      socket.to(room).broadcast.emit("userConnected.room", newUser)

      getAllUsers(room, "game").then(users => {
        io.to(room).emit(
          "users.room",
          isPlaying,
          newUser,
          users
        )
      })

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
  socket.on("guess.room", ({username, message}, callback) => {
    getUserByUsername(username, "game").then(user => {
      if (user) {
        io.to(user.room).emit("guess", {
          username: user.username,
          message,
        })
      }
    })

  })
}

const removeGuess = function (socket, io) {
  socket.on("guessRemove.room", ({room}, callback) => {
    io.to(room).emit("guessRemove.room")
  })
}

const paintGame = function (socket, io) {
  socket.on("paint.room", (options, callback) => {
    const {line, username, color, size, clear} = options
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
    io.emit("wordShow.room", {word, round})
    if (typeof callback === "function") {
      callback()
    }
  })
}

const getUsersTurn = function (socket, io) {
  socket.on("usersTurn.room", ({room, nextTurn}, callback) => {
    getUserTurnByUsername(room, nextTurn).then(turnedUser => {
      turnedUser = turnedUser
      io.emit("usersTurn.room", {
        isPlaying,
        nextTurn: turnedUser,
      })
      if (typeof callback === "function") {
        callback()
      }
    })

  })
}

const updateUsers = function (socket, io) {
  socket.on("usersUpdate.room", ({room, turn}) => {
    updateUsersAfterTurn(room, "game", turn).then(users => {
      io.emit("usersUpdate.room", users)
    })

  })
}

const updatePoints = function (socket, io) {
  socket.on("usersUpdatePoint.room", ({room, round, guessedUser}) => {
    updateUserPoint(room, round, "game", guessedUser).then(users => {
      io.emit(
        "usersUpdatePoint.room",
        users
      )
    })

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
  socket.on("showResult.room", ({room}, callback) => {
    isPlaying = false
    getAllUsers(room, "game").then(users => {
      io.emit("showResult.room", users)
      io.emit("isPlaying.room", isPlaying)
      if (typeof callback === "function") {
        callback()
      }
    })
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
  socket.on("getCurrentUser.room", ({room, username}, callback) => {
    getUserByUsername(username, "game").then(user => {
      io.emit("getCurrentUser.room", user)
      if (typeof callback === "function") {
        callback()
      }
    })
  })
}

const getCurrentUserById = function (socket, io) {
  socket.on("getInfo.room", (id) => {
    getUserBySocketId(id, "game").then(user => {
      io.emit("getInfo.room", user)
    })
  })
}

const countDown = function (socket, io) {
  socket.on("timer.room", ({word, nextTurn}, callback) => {
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
      io.emit("timer.room", {timer: counter, word, turnedUser: nextTurn})
    }, 1000)
  })
}

const leaveGame = function (socket, io) {
  socket.on("leave.room", ({username, room}) => {
    removeUserByUsername(username, "game").then(user => {
      if (user) {
        socket.to(room).broadcast.emit("userDisConnected.room", {
          username,
        })

        if (username === turnedUser) {
          counter = 60
          clearInterval(timer)
          io.emit("timersUp.room")
        }
        getAllUsers(user.room, "game").then(users => {
          io.to(user.room).emit(
            "users.room",
            isPlaying,
            user,
            users
          )
        })


        io.to(room).emit("message.game", {
          username: "GG BOT",
          message: `${username} has left from this game`,
        })

        io.to(user.room).emit("disconnect")
      }
    })
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

let peers = {}
const peer = function (socket, io) {
  socket.on('initReceive', (username) => {

    peers[socket.id] = socket
    for (let id in peers) {
      if (id === socket.id) continue
      peers[id].emit('initReceive', socket.id, username)
    }
  })

  socket.on('signal', data => {
    if (!peers[data.socket_id]) return
    peers[data.socket_id].emit('signal', {
      socket_id: socket.id,
      signal: data.signal
    })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('removePeer', socket.id)
    delete peers[socket.id]
  })


  socket.on('initSend', (init_socket_id, username) => {
    peers[init_socket_id].emit('initSend', socket.id, username)
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
  peer
}
