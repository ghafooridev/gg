const express = require("express")
const {
  confirmationEmail,
  registerUser,
  currentUser
} = require("../controllers/UserController")

const router = express.Router()

/*
 * @route  get api/user/confirmation/:email/:token
 * @desc   confirmation email
 * @access public
 */
router.get("/confirmation/:email/:token", confirmationEmail)

/*
 * @route  get api/user/register
 * @desc   register User
 * @access public
 */
router.post("/register", registerUser)

/*
 * @route  get api/user/currentUser/:userId
 * @desc   get current User
 * @access public
 */
router.get("/currentUser/:userId", currentUser)

module.exports = router
