import api from "../services/httpService"

export default {
  async register(data) {
    try {
      return await api.post({
        url: "/user/register",
        data,
      })
    } catch (error) {
      //throw new TypeError(error)
    }
  },

  async getCurrentUser(userId) {
    try {
      return await api.get({
        url: `/user/currentUser/${userId}`,
      })
    } catch (error) {
      //throw new TypeError(error)
    }
  },
}
