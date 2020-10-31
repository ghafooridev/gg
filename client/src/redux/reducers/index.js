import user from './userReducer';
import chat from './chatReducer';
import alert from './AlertReducer';
import dialog from './dialogReducer';


import {combineReducers} from 'redux';

const appReducer = combineReducers({
	user,
	chat,
	alert,
	dialog
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
