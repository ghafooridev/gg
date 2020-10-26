const express = require('express');
const {confirmationEmail,registerUser} = require('../controllers/UserController');

const router = express.Router();

/*
* @route  get api/user/confirmation/:email/:token
* @desc   confirmation email
* @access public
*/
router.get('/confirmation/:email/:token', confirmationEmail);

/*
* @route  get api/user/register
* @desc   register User
* @access public
*/
router.post('/register', registerUser)

module.exports = router;
