const users = []

const addUser = function ({id, username, game}) {

  const existingUser = users.find(
    (user) => user.username === username && user.game === game
  )

  if (existingUser) {
    return { error: "user is taken" }
  }

  const user = { id, username, game }
  users.push(user)

  return { user }
}

const removeUser = function (id) {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = function (id) {
  return users.find((user) => user.id === id)
}

const getUserInGame = function (game) {
  return users.filter((user) => user.game === game)
}

module.exports={addUser,removeUser,getUser,getUserInGame}