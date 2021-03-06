import Constant from "../../utils/Constant"
import Storage from "../../services/Storage"

const initialState = {
  ...Storage.pull(Constant.STORAGE.CURRENT_USER),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constant.ACTION_TYPES.LOG_IN_USER: {
      return { ...action.payload, ...state }
    }
    case Constant.ACTION_TYPES.LOG_OUT_USER: {
      Storage.delete(Constant.STORAGE.CURRENT_USER)
      return null
    }
    default:
      return state
  }
}
