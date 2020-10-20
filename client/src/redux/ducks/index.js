/**
 * Ducks root file to combine all reducers into one, and
 * define base actions
 */
import userReducer from '../reducers/user';
import chatReducer from '../reducers/chat';
import { combineReducers } from 'redux';

// Action Type

// Actions

// Reducer
const appReducer = combineReducers({
	user: userReducer,
	chat: chatReducer,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
