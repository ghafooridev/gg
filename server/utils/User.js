const UserModel = require("../models/User")

let users = []

const addUser = async function ({ id, username, game, place, NOP,point }) {
  const existingUser = users.find(
    (user) =>
      user.username === username && user.game === game && user.place === place
  )

  if (!existingUser) {
    const result = await UserModel.findOne({ username })
    const user = {
      id,
      username,
      game,
      university: result.university,
      place,
      NOP,
      point
    }
    users.push(user)

    return { user }
  }
}

const removeUser = function (id, place) {
  const index = users.findIndex(
    (user) => user.id === id && user.place === place
  )

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const removeUserByUsername = function (username, place) {
  const index = users.findIndex(
    (user) => user.username === username && user.place === place
  )

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = function (id, place) {
  return users.find((user) => user.id === id && user.place === place)
}

const getUserByUsername = function (username, place) {
  return users.find(
    (user) => user.username === username && user.place === place
  )
}

const getAllUsers = function (game, place) {
  return users.filter((user) => user.game === game && user.place === place)
}

const updateUsersAfterTurn = function (game, place, turn) {
  const filteredUser = users.filter(
    (user) => user.game === game && user.place === place
  )
  const index = filteredUser.findIndex((item) => item.username === turn)
  const updateUsers = [...filteredUser]
  if (index !== -1) {
    updateUsers[index] = {
      ...updateUsers[index],
      NOP: updateUsers[index].NOP + 1,
    }
    users = [...updateUsers]
    return users
  }
}


const updateUserPoint = function (game, place,username) {
  const filteredUser = users.filter(
    (user) => user.game === game && user.place === place
  )
  const index = filteredUser.findIndex((item) => item.username === username)
  const updateUsers = [...filteredUser]
  if (index !== -1) {
    updateUsers[index] = {
      ...updateUsers[index],
      point: updateUsers[index].point + 100,
    }
    users = [...updateUsers]
    return users
  }
}

const getUserTurnByUsername = function () {
  const lastPlayer = users.find((user) => user.NOP === 0)

  if (lastPlayer) {
    return lastPlayer.username
  }

  let minPlayPlayer = users[0]
  users.forEach((user) => {
    if (user.NOP < minPlayPlayer.NOP) {
      minPlayPlayer = user
    }
  })

  if (minPlayPlayer) {
    return minPlayPlayer.username
  }
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  removeUserByUsername,
  getUserByUsername,
  getAllUsers,
  getUserTurnByUsername,
  updateUsersAfterTurn,
  updateUserPoint
}
