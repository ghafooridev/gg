const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)
const mongoPass = process.env.DB_PASS
const mongoUser = process.env.DB_USER

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.yoddu.mongodb.net/game?retryWrites=true&w=majority`

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false },
  (err) => {
    if (!err) {
      console.log("Successfully Connected to MongoDB")
    } else {
      console.log(`Syntax Error: ${err}`)
    }
  }
)

module.exports = mongoose
