const mongoose = require("mongoose")

const { Schema } = mongoose

const tokenSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
})

module.exports = mongoose.model("token", tokenSchema)
