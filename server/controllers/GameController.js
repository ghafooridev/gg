const passport = require("passport")
const Game = require("../models/Game")
const Constant = require("../utils/Constant")
const gameDTO = require("../dto/Game")

exports.addGame = function (req, res) {
  passport.authenticate("jwt", function (err, user) {
    const { name, point } = req.body

    if (err) {
      return res.status(401).json(Constant.ERROR.UNAUTHORIZED)
    }

    const newRecord = new Game({
      name,
      player: user,
      point,
    })

    return Game.create(newRecord)
      .then((game) => {
        res.json(game)
      })
      .catch((err) => {
        res.status(400).json(err)
      })
  })(req, res)
}

exports.allGames = function (req, res) {
  Game.find()
    .populate("player")
    .then((games) => {
      return res.json(
        games.map((game) => {
          return gameDTO(game)
        })
      )
    })
}
