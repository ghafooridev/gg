const { addUser, getUser, getUserInGame, removeUser } = require("../utils/User")

const joinGame = function (socket, io) {
  socket.on("join", ({ username, game }, callback) => {
    const { user, error } = addUser({ id: socket.id, username, game })
    if (error) {
      return callback(error)
    }

    socket.emit("message", {
      username: "Admin",
      message: `${username},welcome to ${game}`,
    })

    socket.broadcast.to(game).emit("message", {
      username: "Admin",
      message: `${username} has joined to ${game}`,
    })

    socket.join(game)

    callback()
  })
}

const sendMessage = function (socket, io) {
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)
    io.to(user.game).emit("message", {
      username: user.username,
      message,
    })

    callback()
  })
}

const paint=function(socket,io){
  socket.on("paint", (options, callback) => {
    // const {line,color,size}=options;
    const {line,username}=options;
    const user = getUser(socket.id)
    io.emit("draw", {
      username,
      line,
    })

    callback()
  })
}

const disconnect = function (socket, io) {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.game).emit("message", {
        username: "Admin",
        message: `${user.username} has left the ${user.game}`,
      })
    }
  })
}

module.exports = { joinGame, sendMessage, disconnect,paint }
