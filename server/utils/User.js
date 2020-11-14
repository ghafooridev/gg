const UserModel = require("../models/User")

const users = []

const addUser = async function ({ id, username, game }) {
  const existingUser = users.find(
    (user) => user.username === username && user.game === game
  )
  // let user
  if (!existingUser) {
    const result = await UserModel.findOne({ username })
    const user = { id, username, game, university: result.university }
    users.push(user)

    return { user }
  }
}

const removeUser = function (id) {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}
const removeUserByUsername = function (username) {
  const index = users.findIndex((user) => user.username === username)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = function (id) {
  return users.find((user) => user.id === id)
}

const getUserByUsername = function (username) {

  return users.find((user) => user.username === username)
}

const getUserInGame = function (game) {
  return users.filter((user) => user.game === game)
}

module.exports = { addUser, removeUser, getUser, getUserInGame ,removeUserByUsername,getUserByUsername}
