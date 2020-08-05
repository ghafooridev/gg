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

io.on('connection', socket => {
    // user joining room
    socket.on("join room", roomID => {

        // check if users array for roomID exists
        if (users[roomID]) {
            const length = users[roomID].length;

            // room already full
            if (length === 4) {
                socket.emit("room full");
                return;
            }

            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }

        // update server-side collections
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.join(roomID);

        console.log("User connected! ", socket.id);
        console.log(users, socketToRoom);
        console.log("-------------");

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];

        console.log('user disconnected! ', roomID, socket.id);
        console.log(socketToRoom);
        

        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;

            console.log('emitting user disconnect event!');
            io.to(roomID).emit("user disconnect", { room: roomID, id: socket.id, users: room })
        }

        console.log("-------------");
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