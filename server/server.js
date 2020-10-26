require("dotenv").config()
const express = require("express")

const app = express()
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const socketio = require("socket.io")
const path = require("path")

const http = require("http")
const fs = require("fs")
const https = require("https")

const { ROOM_CLEAN_INTERVAL } = require("./config")
const api = require("./api")

const socketHelper = require("./helpers/socketHelper")

let server = http.createServer(app)

if (process.env.PROD) {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.LETS_ENCRYPT_PRIVKEY),
      cert: fs.readFileSync(process.env.LETS_ENCRYPT_CERT),
    },
    app
  )
}

const io = socketio(server)

// socket connection event
io.on("connection", (socket) => {
  // user joins room
  const handleRoomJoin = (payload) => {
    const room = payload.roomId
    const userId = payload.userId

    io.in(room).clients((error, clients) => {
      if (error) {
        throw error
      }

      socket.join(room)
      socketHelper.addUserRoom(room, userId)
      socketHelper.setSocketRoom(socket.id, room, userId)

      // send current room sockets to newly joined user
      socket.emit("room users", clients)
      // socket.emit('new user', userId);
    })
  }

  // user joins lobby
  const handleLobbyJoin = (payload) => {
    const lobby = payload.lobbyId
    const user = payload.user

    io.in(lobby).clients((error, clients) => {
      if (error) throw error

      console.log(user, clients)

      // get current lobby users
      const emitCurrentUsers = (users) => {
        if (users.toString() === [null].toString() || users.length === 0) {
          socket.emit("lobby users", [])
        } else {
          socket.emit("lobby users", users)
        }
      }
      socketHelper.getLobbyUsers(lobby, emitCurrentUsers)

      socket.join(lobby)

      // track socketId map to room / lobby id
      socketHelper.setSocketRoom(socket.id, lobby, user._id)

      const lobbyFullClbk = (roomId) => {
        io.to(lobby).emit("game found", { roomId })
      }
      socketHelper.addUserLobby(lobby, user, lobbyFullClbk, payload.game)
      socket.to(lobby).emit("user joined lobby", user._id)
    })
  }

  // user disconnected
  const userDisconnected = () => {
    console.log("user disconnected! ", socket.id)

    socketHelper.getSocketRoom(socket.id).then(([room, userId]) => {
      if (!room) return

      console.log("emitting user disconnect event to room:", room)
      io.to(room).emit("user disconnect", {
        room,
        id: userId,
        socketId: socket.id,
      })

      socketHelper.removeSocketObject(socket.id)
    })
  }

  // sending signal
  const sendSignal = (payload) => {
    console.log("send signal payload: ", socket.id)
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      userId: payload.userId,
    })
  }

  // returning signal
  const returnSignal = (payload) => {
    console.log("return signal payload: ", socket.id)
    io.to(payload.callerID).emit("user answer", {
      signal: payload.signal,
      id: socket.id,
      userId: payload.userId,
    })
  }

  // user sends message to room
  const sendMessage = (payload) => {
    console.log("message recieved from: ", payload.sender)

    socketHelper.getSocketRoom(socket.id).then(([roomId, _]) => {
      io.to(roomId).emit("message notification", {
        message: payload.message,
        sender: payload.sender,
        senderId: payload.id,
        color: payload.color,
      })

      const isRoom = !!payload.room
      socketHelper.storeChatMessage(
        payload.message,
        payload.sender,
        isRoom,
        roomId
      )
    })
  }

  // events
  socket.on("subscribe", handleRoomJoin)
  socket.on("user queue", handleLobbyJoin)

  socket.on("disconnect", userDisconnected)
  socket.on("sending signal", sendSignal)
  socket.on("returning signal", returnSignal)

  socket.on("user message", sendMessage)
})

// attach to api router
app.use("/api", api)

// clean rooms periodically
setInterval(socketHelper.removeInactiveRooms, ROOM_CLEAN_INTERVAL)

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })

  app.get("/room", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })

  app.get("/room/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })

  app.get("/lobby", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })
}

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`server is running on port ${port}`))
