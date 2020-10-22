import Constant from "../../utils/Constant";

const initialState = {
	show: false,
	text: '',
}

export default function (state = initialState, action) {
	switch (action.type) {
		case Constant.ACTION_TYPES.SHOW_TOAST: {
			return {
				...state,
				...action.option,
				show: true,
			}
		}
		case Constant.ACTION_TYPES.HIDE_TOAST: {
			return {
				...state,
				show: false,
			}
		}
		default:
			return state
	}
}