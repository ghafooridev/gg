const socketio = require("socket.io")
const { joinLobby, chatLobby, leaveLobby, enterGame } = require("./Lobby")
const {
  joinGame,
  guessGame,
  leaveGame,
  paintGame,
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
} = require("./Game")

const connections = (server) => {
  const io = socketio(server)

  io.on("connection", (socket) => {
    joinLobby(socket, io)
    chatLobby(socket, io)
    leaveLobby(socket, io)
    enterGame(socket, io)

    joinGame(socket, io)
    guessGame(socket, io)
    leaveGame(socket, io)
    paintGame(socket, io)
    selectWord(socket, io)
    showResult(socket, io)
    getUsersTurn(socket, io)
    updateUsers(socket, io)
    hideResult(socket, io)
    removeGuess(socket, io)
    updatePoints(socket, io)
    countDown(socket, io)
    getCurrentUser(socket, io)
    getCurrentUserById(socket, io)
    selectWordTimer(socket, io)
  })
}

module.exports = connections
