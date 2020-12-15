const gamesList = ["Mafia", "Covidopoly", "Drawasaurus"]

const gameSizes = {
  Mafia: 6,
  Covidopoly: 3,
  Drawasaurus: 2,
}

const ROOM_ID_LEN = 7
const LOBBY_ID_LEN = 5

const ROOM_CLEAN_INTERVAL = 10800000

const BCRYPT_SALT_WORK_FACTOR = 10

const secretOrKey = "secret"

module.exports = {
  gamesList,
  gameSizes,
  ROOM_ID_LEN,
  LOBBY_ID_LEN,
  ROOM_CLEAN_INTERVAL,
  SALT_WORK_FACTOR: BCRYPT_SALT_WORK_FACTOR,
  secretOrKey
}
