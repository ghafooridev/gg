// env vars
const dotenv = require("dotenv");
dotenv.config();

// connect to database
const mongoose = require('./db');

const util = require("./util");
const Room = require("./models/Room");
const Lobby = require("./models/Lobby");
const { gamesList, ROOM_ID_LEN, LOBBY_ID_LEN, gameSizes } = require("./config");

var express = require('express');
const User = require('./models/User');
var router = express.Router()

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  if(!process.env.PROD) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept",);
  }

  console.log('Time: ', Date.now())
  next()
})

// define the home route
router.get('/', function (req, res) {
  res.send('Welcome to api v0.1')
})

// test route to test if api is accessible
router.get('/hello', function (req, res) {
  console.log(req.query);
  res.send('Hello there')
})

// create a room and return the room id
router.post('/create/room', (req, res) => {

  if (!req.query.game) {
    res.status(400).send("Missing game query param!");
  }

  let roomId = "";
  util.generateUniqueId(Room, "roomId", ROOM_ID_LEN).then(id => {
    roomId = id;

    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      roomId: roomId,
      users: [],
      game: req.query.game
    });
  
    room.save(err => {
      if (err) return console.error(err);
    })
  
    res.json({roomId: roomId});

  });
});

// create a lobby and return the lobby id
router.post('/create/lobby', (req, res) => {
  if (!req.query.game) {
    res.status(400).send("Missing game query param!");
  }

  let lobbyId = "";
  util.generateUniqueId(Lobby, "lobbyId", LOBBY_ID_LEN).then(id => {
    lobbyId = id;

    const lobby = new Lobby({
      _id: new mongoose.Types.ObjectId(),
      lobbyId: lobbyId,
      users: [],
      game: req.query.game
    });

    lobby.save(err => {
      if (err) return console.error(err);
    });

    res.json({lobbyId: lobbyId});
  });
});

// user joins a room
router.put('/user/joinRoom', (req, res) => {
  // TODO: authenticate user here

  // check if the user should be allowed to be in the room 

  // add user to room users array
});

// user joins a lobby
router.put('/user/joinLobby', (req, res) => {
  if (!req.query.game) {
    res.status(400).send("Missing game query param!");
  }

  // set user status to in queue
  // const user = req.user;
  // User.findOneAndUpdate({ _id: user._id }, { isQueue: true }, (err, __, _) => {
  //   console.log(err);
  //   if (err) res.status(503);
  // })

  // check for open lobbies
  Lobby.findOne({ userCount: { $lt: gameSizes[req.query.game] } }, (err, lobby) => {
    if (err) console.error(err);

    if (lobby) {
      res.json({ lobbyId: lobby.lobbyId });
      return
    }

    // create new lobby if no open ones exist
    util.generateUniqueId(Lobby, "lobbyId", LOBBY_ID_LEN).then(id => {
      lobbyId = id;
  
      const lobby = new Lobby({
        _id: new mongoose.Types.ObjectId(),
        lobbyId: lobbyId,
        users: [],
        game: req.query.game
      });
  
      lobby.save(err => {
        if (err) return console.error(err);
      });
  
      res.json({lobbyId: lobbyId});
    });

  })

});

router.get('/user/message', (req, res) => {
  
})

// return stats on number of users active, number of rooms, how many users in each game etc.
router.get('/serverstats', (req, res) => {  
  // perform actions on the collection object
  if(req.query.users) {
    res.send({activeUsers: 123})
  } 
  
  else if (req.query.activeRooms) {  
    Room.find({ active: true }).exec( (err, results) => {
      if (err) console.error(err);
      res.send({ activeRooms: results.length });
    });

  } 
  
  else if(req.query.gameUsers) {
    let roomUsers = {};
    let lobbyUsers = {};
    let gameUsers = {};

    gamesList.forEach(gameName => {
      Room.find({ game: gameName, active: true }).exec( (err, results) => {
        if (err) console.error(err);
        roomUsers[gameName] = results.length
      });

      Lobby.find({ game: gameName, active: true }).exec( (err, results) => {
        if (err) console.error(err);
        lobbyUsers[gameName] = results.length;
      });

      gameUsers[gameName] = roomUsers[gameName] + lobbyUsers[gameName];
    });

    res.send({ gameUsers: gameUsers });
  } 
  
  else if (req.query.all) {
    res.send({
      activeRooms: 5,
      activeUsers: 123,
      gameUsers: {
        Mafia: 23,
        Covidopoly: 50,
        Scribble: 50
      }
    })
  }
});

module.exports = router