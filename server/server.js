require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());

const socket = require('socket.io');
const path = require('path');

const { ROOM_CLEAN_INTERVAL } = require('./config');
const api = require('./api');

const http = require('http');
const socketHelper = require('./helpers/socketHelper');
let server = http.createServer(app);

if (process.env.PROD) {
  const fs = require('fs');
  const https = require('https');
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.LETS_ENCRYPT_PRIVKEY),
      cert: fs.readFileSync(process.env.LETS_ENCRYPT_CERT),
    },
    app
  );
}

const io = socket(server);

// const socketToRoom = {}; // socket ID -> room ID map
// rooms = {};
queue = {};

// socket connection event
io.on('connection', (socket) => {
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

      // send current room sockets to newly joined user
      socket.emit('room users', clients);
      // socket.emit('new user', userId);
    });
  };

  // user joins lobby
  const handleLobbyJoin = (payload) => {
    const lobby = payload.lobbyId;
    const user = payload.user;

    io.in(lobby).clients((error, clients) => {
      if (error) throw error;

      console.log(user);

      // get current lobby users
      emitCurrentUsers = (users) => {
        if (users.toString() == [null].toString() || 
              users.length === 0) {
          socket.emit("lobby users", []);
        }
        else {
          socket.emit("lobby users", users)
        }
      }
      socketHelper.getLobbyUsers(lobby, emitCurrentUsers);

      socket.join(lobby);

      // track socketId map to room / lobby id
      socketHelper.setSocketRoom(socket.id, lobby, user._id);

      const lobbyFullClbk = (roomId) => {
        io.to(lobby).emit('game found', { roomId: roomId });
      };
      socketHelper.addUserLobby(lobby, user, lobbyFullClbk, payload.game);
      socket.to(lobby).emit('user joined lobby', user._id);
    });
  };

  // user disconnected
  const userDisconnected = () => {
    console.log('user disconnected! ', socket.id);

    // const room = socketToRoom[socket.id];
    socketHelper.getSocketRoom(socket.id).then((room) => {
      io.to(room).emit('user disconnect', { room: room, id: socket.id });
    });

    socketHelper.removeSocketObject(socket.id);      

    console.log('user removed from room');
    console.log('-------------');
  };

  // sending signal
  const sendSignal = (payload) => {
    console.log("send signal payload: ", payload.userId)
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
      userId: payload.userId
    });
  };

  // returning signal
  const returnSignal = (payload) => {
    console.log("return signal payload: ", payload.userId)
    io.to(payload.callerID).emit('user answer', {
      signal: payload.signal,
      id: socket.id,
      userId: payload.userId
    });
  };

  // user sends message to room
  const sendMessage = (payload) => {
    console.log('message recieved from: ', payload.sender);

    socketHelper.getSocketRoom(socket.id).then((roomId) => {
      io.to(roomId).emit('message notification', {
        message: payload.message,
        sender: payload.sender,
        senderId: payload.id,
      });

      const isRoom = payload.room ? true : false;
      socketHelper.storeChatMessage(
        payload.message,
        payload.sender,
        isRoom,
        roomId
      );
    });
  };

  // events
  socket.on('subscribe', handleRoomJoin);
  socket.on('user queue', handleLobbyJoin);

  socket.on('disconnect', userDisconnected);
  socket.on('sending signal', sendSignal);
  socket.on('returning signal', returnSignal);

  socket.on('user message', sendMessage);
});

// attach to api router
app.use('/api', api);

// clean rooms periodically
setInterval(socketHelper.removeInactiveRooms, ROOM_CLEAN_INTERVAL);

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
