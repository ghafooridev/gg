// env vars
const dotenv = require('dotenv');
dotenv.config();

// connect to database
const mongoose = require('./db');

const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('./helpers/valid');

const util = require('./util');

const Room = require('./models/Room');
const Lobby = require('./models/Lobby');
const User = require('./models/User');

const { ROOM_ID_LEN, LOBBY_ID_LEN, gameSizes } = require('./config');

const jwt = require('jsonwebtoken');
var express = require('express');
const { registerController } = require('./auth.controller');
var router = express.Router();

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

// define the home route
router.get('/', function (req, res) {
  res.send('Welcome to api v0.1');
});

// test route to test if api is accessible
router.get('/hello', function (req, res) {
  console.log(req.query);
  res.send('Hello there');
});

// create a room and return the room id
router.post('/create/room', (req, res) => {
  if (!req.query.game) {
    res.status(400).send('Missing game query param!');
  }

  let roomId = '';
  util.generateUniqueId(Room, 'roomId', ROOM_ID_LEN).then((id) => {
    roomId = id;

    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      roomId: roomId,
      users: [],
      game: req.query.game,
    });

    room.save((err) => {
      if (err) return console.error(err);
    });

    res.json({ roomId: roomId });
  });
});

router.get('/room/gameName', (req, res) => {
  if (!req.query.roomId) 
    res.status(400).json({ error: "roomId param missing." })

  Room.findOne({ roomId: req.query.roomId }, (err, doc) => {
    if (err) return res.status(400).json({ error: "error occured: "+ err })
    if (!doc) return res.status(400).json({ error: "unable to find room with that roomId" });

    return res.status(200).json({ gameName: doc.game });
  });
});

// create a lobby and return the lobby id
router.post('/create/lobby', (req, res) => {
  if (!req.query.game) {
    res.status(400).send('Missing game query param!');
  }

  let lobbyId = '';
  util.generateUniqueId(Lobby, 'lobbyId', LOBBY_ID_LEN).then((id) => {
    lobbyId = id;

    const lobby = new Lobby({
      _id: new mongoose.Types.ObjectId(),
      lobbyId: lobbyId,
      users: [],
      game: req.query.game,
    });

    lobby.save((err) => {
      if (err) return console.error(err);
    });

    res.json({ lobbyId: lobbyId });
  });
});

router.get('/lobby/gameName', (req, res) => {
  if (!req.query.lobbyId) 
    res.status(400).json({ error: "lobbyId param missing." })

  Lobby.findOne({ lobbyId: req.query.lobbyId }, (err, doc) => {
    if (err) return res.status(400).json({ error: "error occured: "+ err })
    if (!doc) return res.status(400).json({ error: "unable to find lobby with that lobbyId" });

    return res.status(200).json({ gameName: doc.game });
  });
})

/*
 * ====================== USER AUTHENTICATION ROUTES ======================
 */

// authenticate email and password
router.post('/user/authenticate', validLogin, (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).json({errors: "email password combination is incorrect!"})

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        const username = user.username;
        const password = user.password;
        const email = user.email;
        const token = jwt.sign(
          { username, password, email },
          process.env.TOKEN_SECRET,
          { expiresIn: '7d' }
        );

        delete user.password;

        res.json({
          ...user.toObject(),
          token: token,
        });
      } else {
        return res.status(400).json({errors: "email password combination is incorrect!"});
      }
    });
  });
});

// register a new user
router.post('/user/register', validSign, registerController);

// router.post('/user/activation', activationController);
// router.put('/user/forgotpassword',  forgotPasswordValidator, forgotPasswordController);
// router.put('/user/resetpassword', resetPasswordValidator, resetPasswordController);

/**
 * ====================== END ======================
 */

// get user information
router.get('/user/getInfo', (req, res) => {
  if(!req.query.userId) {
    return res.status(400).json({error: "Missing userId query param."})
  }

  User.findById(req.query.userId, (err, doc) => {
    if (err) return res.status(400).json({error: "Error occured while finding user with user id: " + req.query.userId});
    if (!doc) return res.status(400).json({error: "User not found with that user id"});

    return res.status(200).json(doc);
  })
})

// user joins a room
router.put('/user/joinRoom', (req, res) => {
  // TODO: authenticate user here
  // check if the user should be allowed to be in the room
  // add user to room users array
});

router.put('/user/leaveRoom', (req, res) => {

});

// user joins a lobby
router.put('/user/joinLobby', (req, res) => {
  if (!req.query.game) {
    res.status(400).send('Missing game query param!');
  }

  // set user status to in queue
  // const user = req.user;
  // User.findOneAndUpdate({ _id: user._id }, { isQueue: true }, (err, __, _) => {
  //   console.log(err);
  //   if (err) res.status(503);
  // })

  // check for open lobbies
  Lobby.findOne(
    { userCount: { $lt: gameSizes[req.query.game] } },
    (err, lobby) => {
      if (err) console.error(err);

      if (lobby) {
        res.json({ lobbyId: lobby.lobbyId, users: lobby.users });
        return;
      }

      // create new lobby if no open ones exist
      util.generateUniqueId(Lobby, 'lobbyId', LOBBY_ID_LEN).then((id) => {
        lobbyId = id;

        const lobby = new Lobby({
          _id: new mongoose.Types.ObjectId(),
          lobbyId: lobbyId,
          users: [],
          game: req.query.game,
        });

        lobby.save((err) => {
          if (err) return console.error(err);
        });

        res.json({ lobbyId: lobbyId, users: [] });
      });
    }
  );
});

router.put('/user/leaveLobby', (req, res) => {
  if (!req.query.lobbyId)
    return res.status(400).json({error: "no lobby id supplied"});
  
  if (!req.query.userId)
    return res.status(400).json({error: "no user id supplied"});
  
  Lobby.findOneAndUpdate(
    { lobbyId: req.query.lobbyId },
    { $pullAll: { users: [req.query.userId] }, $inc: { userCount: -1 } },
    (err, _, ___) => {
      if (err) {
        console.error(err);
        return res.status(400).json({error: "failed to remove user: "+err});
     }
    }
  );

  return res.status(200).json({success: "user successfully remove from lobby"});
});

// return stats on number of users active, number of rooms, how many users in each game etc.
router.get('/serverstats', (req, res) => {
  // perform actions on the collection object
  if (req.query.users) {
    Room.aggregate([
      { $group: { _id: '$active', total: { $sum: '$userCount' } } },
    ]).exec((err, roomRes) => {
      if (err) console.error(err);

      Lobby.aggregate([
        { $group: { _id: '$active', total: { $sum: '$userCount' } } },
      ]).exec((err, lobbyRes) => {
        if (err) console.error(err);
        console.log(roomRes, lobbyRes);
        const emptyLobby = lobbyRes.length === 0;
        const emptyRoom = roomRes.length === 0;
        console.log(emptyLobby, emptyRoom);

        if (!emptyLobby && !emptyRoom)
          res.send({ activeUsers: roomRes[0].total + lobbyRes[0].total });
        else if (!emptyRoom) res.send({ activeUsers: roomRes[0].total });
        else if (!emptyLobby) res.send({ activeUsers: lobbyRes[0].total });
        else res.send({ activeUsers: 0 });
      });
    });
  } else if (req.query.activeRooms) {
    Room.find({ active: true }).exec((err, results) => {
      if (err) console.error(err);
      res.send({ activeRooms: results.length });
    });
  } else if (req.query.gameUsers) {
    // TODO: maybe include lobby users here too?
    Room.aggregate([
      { $group: { _id: '$game', total: { $sum: '$userCount' } } },
    ]).exec((err, results) => {
      console.log('results: ', results);
      if (err) console.error(err);
      res.send({ activeRooms: results });
    });
  } else if (req.query.all) {
    res.send({
      activeRooms: 5,
      activeUsers: 123,
      gameUsers: {
        Mafia: 23,
        Covidopoly: 50,
        Scribble: 50,
      },
    });
  } else {
    res.status(403).send('missing query');
  }
});

module.exports = router;
