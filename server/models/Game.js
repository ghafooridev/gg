const mongoose = require("mongoose")

const Constant = require("../utils/Constant")

const { Schema } = mongoose

const GameSchema = new Schema({
  name: {
    type: String,
    enum: Constant.ENUMS.GAMES,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  point: {
    type: String,
  },
})

module.exports = mongoose.models.game || mongoose.model("game", GameSchema)
