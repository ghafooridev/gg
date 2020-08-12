require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");

const util = require("./util");

const users = {}; // room ID -> users in room map
const socketToRoom = {}; // socket ID -> room ID map
rooms = {};
queue = {};

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

        if(socket.id in queue) {
          delete queue[socket.id];
          console.log("user removed from queue");
          console.log("-------------");
          return;
        }

        const room = socketToRoom[socket.id];
        delete socketToRoom[room];
        
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
    const userQueue = (user) => {
      queue[socket.id] = user;
      
      // if 4 or more players are waiting, then create game room
      if (Object.keys(queue).length >= 2) {
        do { roomId = util.makeId(5) }
        while(roomId in rooms);

        var userCount = 0;
        for (const [socketId, _] of Object.entries(queue)) {
          if(userCount == 4) return; 

          io.to(socketId).emit("game found", { roomId: roomId });
          delete queue[socketId];
          userCount += 1;
        }
      }
    }

    // events
    socket.on("subscribe", subscribe);
    socket.on("disconnect", userDisconnected);
    socket.on("sending signal", sendSignal);
    socket.on("returning signal", returnSignal);

    socket.on("user queue", userQueue);
});
  

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));