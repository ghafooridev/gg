import api from "../services/httpService"

export default {
  async add(data) {
    return await api.post({
      url: "/feedback",
      data,
    })
  },
}
