/**
 * Ducks root file to combine all reducers into one, and
 * define base actions
 */
import userReducer from './user';
import chatReducer from './chat';
import { combineReducers } from 'redux';

// Action Type

// Actions

// Reducers
const appReducer = combineReducers({
	userReducer,
	chatReducer,
});

export default rootReducer = (state, action) => {
	return appReducer(state, action);
};
