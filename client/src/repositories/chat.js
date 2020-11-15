import api from "../services/httpService"

export default {
  getChatByGame(game) {
    try {
      return api.get({
        url: `/chat/all/${game}`,
      })
    } catch (error) {
      // throw new TypeError(error)
    }
  },
}
