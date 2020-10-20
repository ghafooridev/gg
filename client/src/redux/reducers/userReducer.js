/**
 * Application User state
 */
// Actions

// Reducers
const initialState = {
	name: 'AJ',
	university: 'UCSD',
	description: 'Greasy',
};
const userReducer = (state = initialState, action) => {
	switch (action) {
		default:
			return state;
	}
};

// Action Creators

// Side Effects

export default userReducer;
