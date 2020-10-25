import config from "../config"
import handleResponse from "../helpers/handle-response"
import authHeader from "../helpers/auth-header"

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() }
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse)
}

function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() }
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  )
}

const userService = {
  getAll,
  getById,
}

export default userService
