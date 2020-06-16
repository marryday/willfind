import { call, put, takeEvery} from "redux-saga/effects";
import actionTypes from "../redux/actionTypes";
import history from '../heplers/history'
import {
  loginFetch,
  logoutFetch,
  registerFetch,
  loadingStart,
  loadingError,
} from "../actionCreators/actionCreatorSaga";

const fetchLogin = async ({ email, password }) => {
  try {
    const response = await (await fetch(`/profile/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })).json();
    if (response) {
      localStorage.setItem("userSession", response.status);
      localStorage.setItem("userName", response.userSession.login);
      localStorage.setItem('userId', response.userSession.id)
      return response;
    } else {
      alert("net nichego");
    }
  } catch (e) {
    alert("Ошибка, сервер недоступен");
  }
};

const fetchLogout = async () => {
  try {
    const response = await (await fetch(`/profile/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })).json();
    if (response.status) {
      localStorage.clear();
      return false;
    } else {
      alert("net nichego");
    }
  } catch (e) {
    alert("Ошибка, сервер недоступен");
  }
}

const fetchRegister = async ({ name, email, password, repeadPassword }) => {
  const login = name;
  if (password === repeadPassword) {
    try {
      const response = await (await fetch(`/profile/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          login,
          email,
          password,
          repeadPassword
        }),
      })).json();
      if (response) {
        localStorage.setItem("userSession", response.status);
        localStorage.setItem("userName", response.userSession.login);
        localStorage.setItem('userId', response.userSession.id)
        return response;
      } else {
        alert("net nichego");
      }
    } catch (e) {
      alert("Ошибка, сервер недоступен");
    }
  }
}

// Функция-работник.
function* loginPage(action) {
  try {
    yield put(loadingStart());

    const login = yield call(fetchLogin, { email: action.email, password: action.password });
    yield put(loginFetch(login));
   yield put( history.push('/profile'))
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* logoutPage(action) {
  try {
    const logout = yield call(fetchLogout);
    console.log(logout);
    yield put(logoutFetch(logout));
    yield put(history.push('/'))
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* registerPage(action) {
  try {
    const logout = yield call(fetchRegister, { name: action.name, email: action.email, password: action.password, repeadPassword: action.repeadPassword });
    console.log(logout);
    yield put(registerFetch(logout));
    history.push('/profile')
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

// Функция-наблюдатель.
function* saga() {
  yield takeEvery(actionTypes.loginSaga, loginPage);
  yield takeEvery(actionTypes.logoutSaga, logoutPage);
  yield takeEvery(actionTypes.registerSaga, registerPage);
}

export default saga;
