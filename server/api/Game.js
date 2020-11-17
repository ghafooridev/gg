const express = require("express")
const passport = require("passport")
const { addGame, allGames } = require("../controllers/GameController")

const router = express.Router()

/*
 * @route  post api/game
 * @desc   add game
 * @access private
 */
// router.post("/", addGame)

/*
 * @route  get api/games
 * @desc   get all games
 * @access public
 */
router.get("/", allGames)

// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // res.json({ mass: "user" });
//     res.json(true)
//   }
// )


router.post('/', addGame)

module.exports = router
