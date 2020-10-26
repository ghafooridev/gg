// env vars
const dotenv = require('dotenv');
dotenv.config();

// import all the api endpoints
const user = require('./userApi');
const room = require('./roomApi');
const lobby = require('./lobbyApi');

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    if (!process.env.PROD) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
    }
  
    console.log('Time: ', Date.now());
    next();
});
  

// define the home route
router.get('/', function (req, res) {
    res.send('Welcome to api v0.2');
});
  
// test route to test if api is accessible
router.get('/hello', function (req, res) {
console.log(req.query);
res.send('Hello there');
});
  

router.use('/api/user', user);
router.use('/room', room);
router.use('/lobby', lobby);

module.exports = router;