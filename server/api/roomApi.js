var express = require('express');
var router = express.Router();

const Room = require('../models/Room');

// connect to database
const mongoose = require('../db');

// create a room and return the room id
router.post('/create', (req, res) => {
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


router.get('/gameName', (req, res) => {
    if (!req.query.roomId) 
      res.status(400).json({ error: "roomId param missing." })
  
    Room.findOne({ roomId: req.query.roomId }, (err, doc) => {
      if (err) return res.status(400).json({ error: "error occured: "+ err })
      if (!doc) return res.status(400).json({ error: "unable to find room with that roomId" });
  
      return res.status(200).json({ gameName: doc.game });
    });
});
  

module.exports = router;