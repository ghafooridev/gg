import Constant from '../../utils/Constant';
import store from '../store';

export default {
	show: function (option) {
		store.dispatch({type: Constant.ACTION_TYPES.SHOW_TOAST, option});
	},

	hide: function () {
		store.dispatch({type: Constant.ACTION_TYPES.HIDE_TOAST});
	},
};

