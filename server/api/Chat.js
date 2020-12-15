const express = require("express")
const {
  addChat,
  removeChats,
  allChats,
} = require("../controllers/ChatController")

const router = express.Router()

/*
 * @route  get api/chat/all/:game
 * @desc   get all chat by game
 * @access public
 */
router.get("/all/:game", allChats)

/*
 * @route  post api/chat
 * @desc   add chat
 * @access public
 */
router.post("/", addChat)

/*
 * @route  delete api/chat/all/:game
 * @desc   remove all chats by game
 * @access public
 */
router.delete("/all/:game", removeChats)

module.exports = router
