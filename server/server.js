require('dotenv').config();
const express = require("express");
const app = express();

const socket = require("socket.io");
const path = require("path");

const { gamesList, gameSizes, ID_LEN } = require("./config");
const util = require("./util");
const api = require("./api");

const http = require("http");
const socketHelper = require('./socketHelper');
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
io.on("connection", (socket, userId) => {
    // subscribe to room
    const subscribe = room => {
      io.in(room).clients((error, clients) => {
        if (error) {
          throw error;
        }
        
        socket.join(room);
        socketHelper.addUserRoom(room, userId);
        socketHelper.setSocketRoom(socket.id, roomId);

        console.log("room users emitting: ", clients);
        socket.emit("room users", clients);

      });

    };
  
    // user disconnected
    const userDisconnected = () => {
      console.log('user disconnected! ', socket.id);
      console.log("queue: ", queue);

      for(const game in queue) {
        if(socket.id in queue[game]) {
          delete queue[game][socket.id];
          console.log("user removed from queue");
          console.log("-------------");
          return;
        }
      }
        
      // const room = socketToRoom[socket.id];
      socketHelper.getSocketRoom(socket.id).then(room => {
        io.to(room).emit("user disconnect", { room: room, id: socket.id })
      })

      // delete socketToRoom[socket.id];
      socketHelper.removeSocketObject(socket.id);
      // io.to(room).emit("user disconnect", { room: room, id: socket.id })

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
      if (Object.keys(queue[payload.gameName]).length >= gameSizes[payload.gameName]) {
        util.generateUniqueId(Room, "roomId", ID_LEN).then(roomId => {
          
          var userCount = 0;
          
          for (const [socketId, _] of Object.entries(queue[payload.gameName])) {
            if(userCount == gameSizes[payload.gameName]) return; 

            io.to(socketId).emit("game found", { roomId: roomId });
            delete queue[payload.gameName][socketId];
            userCount += 1;
          }

        });
      }
    }

    // user sends message to room
    const sendMessage = payload => {
      console.log("message recieved from: ", payload.sender);
      // const roomId = socketToRoom[socket.id];
      socketHelper.getSocketRoom(socket.id).then(roomId => {
        io.to(roomId).emit("message notification", {message: payload.message, sender: payload.sender, senderId: payload.id});
      })

      // io.to(roomId).emit("message notification", {message: payload.message, sender: payload.sender, senderId: payload.id});

    }

    // events
    socket.on("subscribe", subscribe);
    socket.on("disconnect", userDisconnected);
    socket.on("sending signal", sendSignal);
    socket.on("returning signal", returnSignal);

    socket.on("user queue", userQueue);
    socket.on("user message", sendMessage);
});

// attach to api router
app.use('/api', api);

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