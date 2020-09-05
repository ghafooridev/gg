require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

const socket = require("socket.io");
const path = require("path");

const { ROOM_CLEAN_INTERVAL } = require("./config");
const api = require("./api");

const http = require("http");
const socketHelper = require('./helpers/socketHelper');
let server = http.createServer(app);

if (process.env.PROD) {
  const fs = require('fs');
  const https = require('https');
  server = https.createServer({
    key: fs.readFileSync(process.env.LETS_ENCRYPT_PRIVKEY),
    cert: fs.readFileSync(process.env.LETS_ENCRYPT_CERT)
  }, app);
}

const io = socket(server);

// const socketToRoom = {}; // socket ID -> room ID map
// rooms = {};
queue = {};

// socket connection event
io.on("connection", (socket) => {
    // user joins room
    const handleRoomJoin = (payload) => {
      
      const room = payload.roomId;
      const userId = payload.userId;

      io.in(room).clients((error, clients) => {
        if (error) {
          throw error;
        }
        
        socket.join(room);
        socketHelper.addUserRoom(room, userId);
        socketHelper.setSocketRoom(socket.id, room, userId);

        console.log("room users emitting: ", clients);
        socket.emit("room users", clients);
      });

    };

    // user joins lobby
    const handleLobbyJoin = (payload) => {
      const lobby = payload.lobbyId;
      const userId = payload.userId;

      io.in(lobby).clients((error, clients) => {
        if (error) throw error;

        socket.join(lobby);
        // track socketId map to room / lobby id
        socketHelper.setSocketRoom(socket.id, lobby, userId);
        
        const lobbyFullClbk = (roomId) => {
          io.to(lobby).emit("game found", { roomId: roomId })
        }
        socketHelper.addUserLobby(lobby, userId, lobbyFullClbk, payload.game);
        socket.to(lobby).emit("user joined lobby", userId);
      });
    }

  
    // user disconnected
    const userDisconnected = (userId) => {
      console.log('user disconnected! ', socket.id);
  
      // const room = socketToRoom[socket.id];
      socketHelper.getSocketRoom(socket.id).then(room => {
        io.to(room).emit("user disconnect", { room: room, id: socket.id })
      })

      socketHelper.removeSocketObject(socket.id);

      console.log('user removed from room');
      console.log("-------------");
    };

    // sending signal
    const sendSignal = payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    }

    // returning signal
    const returnSignal = payload => {
      io.to(payload.callerID).emit('user answer', { signal: payload.signal, id: socket.id });
    }

    // user sends message to room
    const sendMessage = payload => {
      console.log("message recieved from: ", payload.sender);

      socketHelper.getSocketRoom(socket.id).then(roomId => {
        io.to(roomId).emit("message notification", {message: payload.message, sender: payload.sender, senderId: payload.id});

        const isRoom = payload.room ? true : false;
        socketHelper.storeChatMessage(payload.message, payload.sender, isRoom, roomId);
      });
    }

    // events
    socket.on("subscribe", handleRoomJoin);
    socket.on("user queue", handleLobbyJoin);

    socket.on("disconnect", userDisconnected);
    socket.on("sending signal", sendSignal);
    socket.on("returning signal", returnSignal);

    socket.on("user message", sendMessage);
});

// attach to api router
app.use('/api', api);

// clean rooms periodically
setInterval(socketHelper.removeInactiveRooms, ROOM_CLEAN_INTERVAL)

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    
    app.get('/room', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.get('/room/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.get('/lobby', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));