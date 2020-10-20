var express = require('express');
var router = express.Router();

const Lobby = require('../models/Lobby');

// connect to database
const mongoose = require('../db');

// create a lobby and return the lobby id
router.post('/create', (req, res) => {
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
  
router.get('/gameName', (req, res) => {
    if (!req.query.lobbyId) 
      res.status(400).json({ error: "lobbyId param missing." })
  
    Lobby.findOne({ lobbyId: req.query.lobbyId }, (err, doc) => {
      if (err) return res.status(400).json({ error: "error occured: "+ err })
      if (!doc) return res.status(400).json({ error: "unable to find lobby with that lobbyId" });
  
      return res.status(200).json({ gameName: doc.game });
    });
  })
  

module.exports = router;