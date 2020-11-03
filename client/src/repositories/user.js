import api from "../services/httpService"

export default {
  register(data) {
    try {
      return api.post({
        url: "/user/register",
        data,
      })
    } catch (error) {
      // throw new TypeError(error)
    }
  },

  getCurrentUser(userId) {
    try {
      return api.get({
        url: `/user/currentUser/${userId}`,
      })
    } catch (error) {
      // throw new TypeError(error)
    }
  },

  resetPassword(data) {
    try {
      return api.post({
        url: "/user/resetPassword",
        data,
      })
    } catch (error) {
      // throw new TypeError(error)
    }
  },

  login(data) {
    try {
      return api.post({
        url: "/user/login",
        data,
      })
    } catch (error) {
      // throw new TypeError(error)
    }
  },
}
