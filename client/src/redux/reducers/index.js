import user from './userReducer';
import chat from './chatReducer';
import toast from './toastReducer';
import dialog from './dialogReducer';


import {combineReducers} from 'redux';

const appReducer = combineReducers({
	user,
	chat,
	toast,
	dialog
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
