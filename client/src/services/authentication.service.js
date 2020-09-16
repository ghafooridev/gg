import { BehaviorSubject } from 'rxjs';

import config from 'config';
import handleResponse from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

function signup(email, password, name, username, university, description) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      username,
      university,
      description,
    }),
  };

  return fetch(`${config.apiUrl}/user/register`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user.userObj));
      currentUserSubject.next(user.userObj);
      return user;
    })
    .catch((err) => {
      console.log('catching error: ', err);
      return err;
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

      return user;
    })
    .catch((err) => {
      console.log('cataching error: ', err);
      return err;
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
