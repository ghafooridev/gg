require('dotenv').config();
const express = require("express");
const app = express();

const socket = require("socket.io");
const path = require("path");

const util = require("./util");

const http = require("http");
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

const users = {}; // room ID -> users in room map
const socketToRoom = {}; // socket ID -> room ID map
rooms = {};
queue = {};

const gameRoomSize = {
  "Scribble": 5,
  "Mafia": 6,
  "Covidopoly": 4,
  "Out of Context": 4,
  "test": 2
}

//socket connection established
io.on("connection", socket => {
    // subscribe to room
    const subscribe = room => {
      io.in(room).clients((error, clients) => {
        if (error) {
          throw error;
        }
        
        socket.join(room);
        rooms[room] = { users: [...clients] };
        socketToRoom[socket.id] = room;

        console.log("room users emitting: ", clients);
        socket.emit("room users", clients);

      });

    };
  
    // user disconnected
    const userDisconnected = () => {
      console.log('user disconnected! ', socket.id);
      console.log("socketToRoom: ", socketToRoom);
      console.log("queue: ", queue);

      for(const game in queue) {
        if(socket.id in queue[game]) {
          delete queue[game][socket.id];
          console.log("user removed from queue");
          console.log("-------------");
          return;
        }
      }
        
      const room = socketToRoom[socket.id];
      delete socketToRoom[socket.id];
      
      io.to(room).emit("user disconnect", { room: room, id: socket.id })
      
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

    // user joins queue
    const userQueue = payload => {
      if (!payload.gameName || !payload.user) {
        console.log("Incorrect params supplied to user queue event");
        return;
      }

      if (payload.gameName && !queue[payload.gameName]) {
        queue[payload.gameName] = {};
      }

      queue[payload.gameName][socket.id] = payload.user;
      
      // if 4 or more players are waiting, then create game room
      if (Object.keys(queue[payload.gameName]).length >= gameRoomSize[payload.gameName]) {
        do { roomId = util.makeId(5) }
        while(roomId in rooms);

        var userCount = 0;
        for (const [socketId, _] of Object.entries(queue[payload.gameName])) {
          if(userCount == gameRoomSize[payload.gameName]) return; 

          io.to(socketId).emit("game found", { roomId: roomId });
          delete queue[payload.gameName][socketId];
          userCount += 1;
        }
      }
    }

    // user sends message to room
    const sendMessage = payload => {
      console.log("message recieved from: ", payload.sender);
      const roomId = socketToRoom[socket.id];
      io.to(roomId).emit("message notification", {message: payload.message, sender: payload.sender, senderId: payload.id});
    }

    // events
    socket.on("subscribe", subscribe);
    socket.on("disconnect", userDisconnected);
    socket.on("sending signal", sendSignal);
    socket.on("returning signal", returnSignal);

    socket.on("user queue", userQueue);
    socket.on("user message", sendMessage);
});
  

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

app.post('/test', (req, res) => {
  res.send('test passed.')
});

app.get('/createroom', (req, res) => {
  let roomId = "";
  do { roomId = util.makeId(5) }
  while(roomId in rooms);

  res.send(roomId);
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));