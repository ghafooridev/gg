import { combineReducers } from "redux"
import user from "./UserReducer"
import chat from "./chatReducer"
import alert from "./AlertReducer"
import dialog from "./dialogReducer"

const appReducer = combineReducers({
  user,
  chat,
  alert,
  dialog,
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
