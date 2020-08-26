const util = require("./util");
var express = require('express')
var router = express.Router()

const MongoClient = require('mongodb').MongoClient;
const mongoPass = process.env.DB_PASS;
const mongoUser = process.env.DB_USER;

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.yoddu.mongodb.net/game?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
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

// create a room and return the roomId
router.get('/createroom', (req, res) => {

  if (!req.query.game) {
    res.status(400).send("Missing game query param!");
  }

  let roomId = "";
  do { roomId = util.makeId(5) }
  while(roomId in rooms);

  client.connect(err => {
    const collection = client.db("game").collection("rooms");
    collection.insertOne({
      roomId: roomId,
      users: [],
      game: req.query.game
    });
  })

  res.json({roomId: roomId});
});

// return stats on number of users active, number of rooms, how many users in each game etc.
router.get('/serverstats', (req, res) => {
  client.connect(err => {
    const collection = client.db("game").collection("rooms");
    
    // perform actions on the collection object
    if (req.query.all) {
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

    client.close();
  }); 
});

module.exports = router