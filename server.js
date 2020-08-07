require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");

const users = {}; // room ID -> users in room map
const socketToRoom = {}; // socket ID -> room ID map
rooms = {}

//socket connection established
io.on("connection", socket => {
    //subscribe to room
    const subscribe = room => {
      io.in(room).clients((error, clients) => {
        if (error) {
          throw error;
        }
        if (clients.length > 2) {
          socket.emit("session_active");
          return;
        }
        
        socket.join(room);
        rooms[room] = { users: [...clients] };
  
        if (clients.length < 2) {
          if (clients.length == 1) socket.emit("create_host");
        }
      });
    };
  
    //siganl offer to remote
    const sendOffer = (room, offer) => {
      socket.to(room).broadcast.emit("new_offer", offer);
    };
  
    //signal answer to remote
    const sendAnswer = (room, data) => {
      socket.to(room).broadcast.emit("new_answer", data);
    };
  
    //user disconnected
    const user_disconnected = room => {
      socket.to(room).broadcast.emit("end");
    };
    //events
    socket.on("subscribe", subscribe);
    socket.on("offer", sendOffer);
    socket.on("answer", sendAnswer);
    socket.on("user_disconnected", user_disconnected);
});
  

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));