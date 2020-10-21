const express = require('express');
const {confirmationEmail} = require('../controllers/UserController');

const router = express.Router();

/*
* @route  get api/user/confirmation/:email/:token
* @desc   confirmation email
* @access public
*/
router.get('/confirmation/:email/:token', confirmationEmail)

module.exports = router;
