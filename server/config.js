const gamesList = ["Mafia", "Covidopoly", "Drawasaurus"]

const gameSizes = {
  "Mafia": 6,
  "Covidopoly": 3,
  "Drawasaurus": 2
}

const ROOM_ID_LEN = 7;
const LOBBY_ID_LEN = 5;

const ROOM_CLEAN_INTERVAL = 10800000;

module.exports = {
  gamesList: gamesList,
  gameSizes: gameSizes,
  ROOM_ID_LEN: ROOM_ID_LEN,
  LOBBY_ID_LEN: LOBBY_ID_LEN,
  ROOM_CLEAN_INTERVAL: ROOM_CLEAN_INTERVAL
}