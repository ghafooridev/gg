// connect to databse
const mongoose = require('./db');

const util = require("./util");
const Room = require("./models/Room");
const Lobby = require("./models/Lobby");
const { gamesList, ID_LEN } = require("./config");

var express = require('express')
var router = express.Router()


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  util.generateUniqueId(Room, "roomId", ID_LEN).then(id => {
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
  util.generateUniqueId(Lobby, "lobbyId", ID_LEN).then(id => {
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
router.get('/user/joinRoom', (req, res) => {
  // TODO: authenticate user here

  // check if the user should be allowed to be in the room 

  // add user to room users array
});

// user joins a lobby
router.get('/user/joinLobby', (req, res) => {
  if (!req.query.game) {
    res.status(400).send("Missing game query param!");
  }

  // TODO: authenticate user

  // check for open lobbies
  Lobby.findOne({ $lt: { userCount: gameSizes[req.query.game] } }, (err, lobby) => {
    if (err) console.error(err);

    if (lobby) {
      res.json({ lobbyId: lobby.lobbyId });
      return
    }

    // create new lobby if no open ones exist
    util.generateUniqueId(Lobby, "lobbyId", ID_LEN).then(id => {
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

  return lobbyId;
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