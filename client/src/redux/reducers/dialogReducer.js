import Constant from "../../utils/Constant"

const initialState = {
  show: false,
  component: null,
  title: "",
  size: "md",
  disableCloseButton: false,
  onAction: () => {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constant.ACTION_TYPES.SHOW_DIALOG: {
      return {
        ...state,
        ...action.option,
        show: true,
      }
    }
    case Constant.ACTION_TYPES.HIDE_DIALOG: {
      return {
        ...state,
        show: false,
      }
    }
    default:
      return state
  }
}
