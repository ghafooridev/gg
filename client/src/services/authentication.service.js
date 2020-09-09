import { BehaviorSubject } from 'rxjs';

import config from 'config';
import handleResponse from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(
	JSON.parse(localStorage.getItem('currentUser'))
);

function signup(newUser) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newUser),
	};

	return fetch(`${config.apiUrl}/user/register`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			console.log(user);
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);
			return user;
		});
}

function login(email, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	};

	return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('currentUser', JSON.stringify(user));
			currentUserSubject.next(user);
			console.log(user);
			return user;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('currentUser');
	currentUserSubject.next(null);
}

const authenticationService = {
	signup,
	login,
	logout,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue() {
		return currentUserSubject.value;
	},
};

export default authenticationService;
