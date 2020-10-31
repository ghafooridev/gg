import api from "../services/httpService"

export default {
  add(data) {
    return api.post({
      url: "/feedback",
      data,
    })
  },
}
