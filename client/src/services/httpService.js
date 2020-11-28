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
        AlertAction.show({
          type: "error",
          text: error.response.data,
        })
        return Promise.reject(error)
      })
  },

  get(options) {
    return axios
      .get(options.url, requestConfig())
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        console.log(error.response)
        AlertAction.show({
          type: "error",
          text: error.response.data,
        })
        return Promise.reject(error)
      })
  },

  put(options) {
    return axios
      .put(options.url, options.data, requestConfig())
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((error) => {
        AlertAction.show({
          type: "error",
          text: error.response.data,
        })
        return Promise.reject(error)
      })
  },

  // TODO: add another http requests here
}
