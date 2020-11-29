const UserModel = require("../models/User")

let users = []

const addUser = async function ({ id, username, room, place, NOP, point }) {
  const existingUser = users.find(
    (user) => user.id === id && user.room === room && user.place === place
  )

  if (!existingUser) {
    const result = await UserModel.findOne({ username })
    const user = {
      id,
      username,
      room,
      university: result.university,
      place,
      NOP,
      point,
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

const getUserById = function (id, place) {
  return users.find((user) => user.id === id && user.place === place)
}

const getAllUsers = function (room, place) {
  return users.filter((user) => user.room === room && user.place === place)
}

const updateUsersAfterTurn = function (room, place, turn) {
  const filteredUser = users.filter(
    (user) => user.room === room && user.place === place
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
  return users
}

const updateUserPoint = function (room, place, username) {
  const filteredUser = users.filter(
    (user) => user.room === room && user.place === place
  )

  // const updateUsers = filteredUser.map((user) => {
  //   if (usernames.includes(user.username)) {
  //     user.point += 5
  //     return user
  //   }
  //   return user
  // })
  // console.log(usernames)
  // console.log(updateUsers)
  // users = [...updateUsers]
  //
  // return users

  const index = filteredUser.findIndex((item) => item.username === username)
  const updateUsers = [...filteredUser]
  if (index !== -1) {
    updateUsers[index] = {
      ...updateUsers[index],
      point: updateUsers[index].point + 50,
    }
    users = [...updateUsers]

    return users
  }
}

const getUserTurnByUsername = function (room, preTurn) {
  const filteredUser = users.filter(
    (user) => user.room === room && user.place === "game"
  )

  if (!preTurn) {
    const player = filteredUser[0]
    return player.username
  }
  const index = filteredUser.findIndex((user) => user.username === preTurn)
  if (index + 1 < filteredUser.length) {
    return filteredUser[index + 1].username
  }

  return filteredUser[0].username
}

const getUserTurnByUsername2 = function (room, preTurn) {
  const filteredUser = users.filter(
    (user) => user.room === room && user.place === "game"
  )
  console.log(preTurn, filteredUser)
  const lastPlayer = filteredUser.find((user) => user.NOP === 0)

  if (lastPlayer) {
    return lastPlayer.username
  }

  let minPlayPlayer = filteredUser[0]
  filteredUser.forEach((user) => {
    if (user.NOP < minPlayPlayer.NOP) {
      minPlayPlayer = user
    }
  })

  if (minPlayPlayer.username === preTurn) {
  }

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
  updateUserPoint,
  getUserById,
}
