const express = require("express")
const {
  confirmationEmail,
  registerUser,
  currentUser,
  resetPassword,
  loginUser,
  allUsers,
  removeUser,
  editUser
} = require("../controllers/UserController")

const router = express.Router()

/*
 * @route  get api/user/confirmation/:email/:token
 * @desc   confirmation email
 * @access public
 */
router.get("/confirmation/:email/:token", confirmationEmail)

/*
 * @route  post api/user/register
 * @desc   register User
 * @access public
 */
router.post("/register", registerUser)

/*
 * @route  post api/user/resetPassword
 * @desc   reset user password
 * @access public
 */
router.post("/resetPassword", resetPassword)

/*
 * @route  post api/user/login
 * @desc   login user to system
 * @access public
 */
router.post("/login", loginUser)

/*
 * @route  get api/user/:userId
 * @desc   get current User
 * @access public
 */
router.get("/:userId", currentUser)

/*
 * @route  get api/user/allUsers
 * @desc   get all Users
 * @access public
 */
router.get("/", allUsers)

/*
 * @route  delete api/user/:userId
 * @desc   remove a user by user id
 * @access public
 */
router.delete("/:userId", removeUser)

/*
 * @route  put api/user/:userId
 * @desc   edit a user by user id
 * @access public
 */
router.put("/:userId", editUser)


module.exports = router
