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
        
        socket.join(room);
        rooms[room] = { users: [...clients] };
        socketToRoom[socket.id] = room;

        console.log("room users emitting: ", clients);
        socket.emit("room users", clients);

      });

    };
  
    // user disconnected
    const user_disconnected = () => {
        const room = socketToRoom[socket.id];

        console.log('user disconnected! ', room, socket.id);
        console.log(socketToRoom);
        socketToRoom[room] = null;
        
        console.log('emitting user disconnect event!');
        io.to(room).emit("user disconnect", { room: room, id: socket.id })

        console.log("-------------");
    };

    // events
    socket.on("subscribe", subscribe);
    socket.on("disconnect", user_disconnected);

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('user answer', { signal: payload.signal, id: socket.id });
    });
});
  

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));