function userDTO(user) {
  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    university: user.university,
    description: user.description,
    active: user.active,
    inQueue: user.inQueue,
    inGame: user.inGame,
    isVerified: user.isVerified,
  }
}

module.exports = userDTO
