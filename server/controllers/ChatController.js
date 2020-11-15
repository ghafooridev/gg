const Chat = require("../models/Chat")
const Constant = require("../utils/Constant")

exports.addChat = function (req, res) {
  const { username, message, game } = req.body

  const newChat = new Chat({
    username,
    message,
    game,
  })

  newChat
    .save()
    .then(() => {
      return res.json(true)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

exports.allChats = function (req, res) {
  const { game } = req.params

  Chat.find({ game })
    .then((chats) => {
      if (!chats) {
        return res.status(422).json(Constant.MESSAGES.CHATS_NOT_FOUND)
      }

      return res.json(chats)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

exports.removeChats = function (req, res) {
  const game = req.param("game")

  Chat.deleteMany({ game })
    .then(() => {
      res.json(true)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
}
