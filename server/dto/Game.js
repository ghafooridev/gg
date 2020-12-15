function gameDTO(game) {
  // return games.map((game) => {
  //   return {
  //     player: game.player.username,
  //     university: game.player.university,
  //     name: game.name,
  //   }
  // })

  return {
    player: game.player.username,
    university: game.player.university,
    name: game.name,
  }
}

module.exports = gameDTO
