import actionTypes from "../redux/actionTypes";

// Это тригерит саму сагу.
export function loadToDoSaga() {
  return { type: actionTypes.loadToDoSaga };
}
export function loginSaga(email, password) {
  return { type: actionTypes.loginSaga, email, password }
}
export function logoutSaga() {
  return { type: actionTypes.logoutSaga };
}
export function registerSaga(name, email, password, repeadPassword) {
  return { type: actionTypes.registerSaga, name, email, password, repeadPassword }
}
export function missedPersonSaga(id) {
  return { type: actionTypes.missedPersonSaga, id }
}

// Эти сага вызывает с помощью put() в тех или иных случаях.
export function loadingStart() {
  return { type: actionTypes.loadingStart };
}

export function loadingSuccess(url) {
  return { type: actionTypes.loadingSuccess, url };
}

export function loadingError(errorMessage) {
  return { type: actionTypes.loadingError, errorMessage };
}

export function loginFetch(email, password) {
  return { type: actionTypes.loginFetch, email, password };
}

export function logoutFetch() {
  return { type: actionTypes.logoutFetch };
}

export function registerFetch(name, email, password, repeadPassword) {
  return { type: actionTypes.registerFetch, name, email, password, repeadPassword };
}

export function missedPersonFetch(payload) {
  return { type: actionTypes.missedPersonFetch, person: payload };
}
