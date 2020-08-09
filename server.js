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
  
        // if (clients.length == 1) {
        //     socket.to(room).emit("create_host");
        // } 

        console.log("room users emitting: ", clients);
        socket.emit("room users", clients);

      });

    };
  
    // signal offer to remote
    const sendOffer = (room, offer) => {
      socket.to(room).broadcast.emit("new_offer", offer);
    };
  
    // signal answer to remote
    const sendAnswer = (room, data) => {
      socket.to(room).broadcast.emit("new_answer", data);
    };
  
    // TODO: user disconnected
    const user_disconnected = () => {
        const roomID = socketToRoom[socket.id];

        console.log('user disconnected! ', roomID, socket.id);
        console.log(socketToRoom);
        
        console.log('emitting user disconnect event!');
        io.to(roomID).emit("user disconnect", { room: roomID, id: socket.id, users: room })

        console.log("-------------");
    };

    // events
    socket.on("subscribe", subscribe);
    socket.on("offer", sendOffer);
    socket.on("answer", sendAnswer);
    // socket.on("disconnect", user_disconnected);

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