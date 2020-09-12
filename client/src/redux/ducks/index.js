/**
 * Ducks root file to combine all reducers into one, and
 * define base actions
 */
import user from './user';
import chat from './chat';
import { combineReducers } from 'redux';

// Action Type

// Actions

// Reducer
const appReducer = combineReducers({
	user,
	chat,
});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
