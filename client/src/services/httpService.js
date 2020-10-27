import axios from "axios"

import AlertAction from "../redux/actions/AlertAction"

import Constant from "../utils/Constant"

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
        AlertAction.show({
          type: "danger",
          text: error.response.data,
        })
        return Promise.reject(error)
      })
  },
  // TODO: add another http requests here
}
