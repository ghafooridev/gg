import axios from "axios"

import { requestConfig } from "./utils"

export default {
  post(options) {
    return axios
      .post(options.url, options.data, requestConfig())
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((error) => {
        // TODO: handle error globally here
        return Promise.reject(error)
      })
  },
  // TODO: add another http requests here
}
