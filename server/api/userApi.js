var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator,
} = require('../helpers/valid');

const { registerController } = require('../auth.controller');

// connect to database
const mongoose = require('../db');

// authenticate email and password
router.post('/authenticate', validLogin, (req, res) => {
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
router.post('/register', validSign, registerController);

// get user information
router.get('/getInfo', (req, res) => {
    if(!req.query.userId) {
      return res.status(400).json({error: "Missing userId query param."})
    }
  
    User.findById(req.query.userId, (err, doc) => {
      if (err) return res.status(400).json({error: "Error occured while finding user with user id: " + req.query.userId});
      if (!doc) return res.status(400).json({error: "User not found with that user id"});
  
      return res.status(200).json(doc);
    })
});

// user joins a lobby
router.put('/joinLobby', (req, res) => {
    if (!req.query.game) {
        res.status(400).send('Missing game query param!');
    }

  // TODO: set user status to in queue
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


router.put('/leaveLobby', (req, res) => {
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

module.exports = router;