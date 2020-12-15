const mongoose = require("mongoose")

const Constant = require("../utils/Constant")

const { Schema } = mongoose

const ChatSchema = new Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
  },
  game: {
    type: String,
    enum: Constant.ENUMS.GAMES,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.chat || mongoose.model("chat", ChatSchema)
