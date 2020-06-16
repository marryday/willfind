import { call, put, takeEvery } from "redux-saga/effects";
import actionTypes from "../redux/actionTypes";
import {
  loginFetch,
  logoutFetch,
  registerFetch,
  loadingStart,
  loadingError,
} from "../actionCreators/actionCreatorSaga";
import {addPoint} from "../redux/actions";
import {ADD_POINT} from "../redux/types";
const TOKEN = 'ac85ebda-7107-4441-88aa-069cf0857ea8';


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
        return response;
      } else {
        alert("net nichego");
      }
    } catch (e) {
      alert("Ошибка, сервер недоступен");
    }
  }
}

const getFetchSearchQuery = async (searchQuery) => {
  // console.log( 'searchQuery',searchQuery)
  try {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${TOKEN}&geocode=${searchQuery.payload}`)
    const result = await response.json()
    const coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
    const latitude = coordinates[1]
    const longitude = coordinates[0]

    console.log('result', result)
    console.log('coordinates', coordinates)
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    // let placemark = new YMaps.Placemark([latitude, longitude], {})
    // if (coordinates) Map.geoObjects.add(placemark);
    return [latitude, longitude];
  }
  catch (error) {

  }
}

// Функция-работник.
function* loginPage(action) {
  try {
    yield put(loadingStart());

    const login = yield call(fetchLogin, { email: action.email, password: action.password });
    yield put(loginFetch(login));
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* logoutPage(action) {
  try {
    const logout = yield call(fetchLogout);
    console.log(logout);
    yield put(logoutFetch(logout));
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* registerPage(action) {
  try {
    const logout = yield call(fetchRegister, { name: action.name, email: action.email, password: action.password, repeadPassword: action.repeadPassword });
    console.log(logout);
    yield put(registerFetch(logout));
  } catch (error) {
    yield put(loadingError(error.message));
  }
}



function* addPointFetch(action) {
  try {
    const coordinates = yield call(getFetchSearchQuery(action)) //[latitude, longitude]
    const obj = {coordinates: coordinates, userId: action.userId}
  } catch (error) {
    yield put(loadingError(error.message));
  }
}


// Функция-наблюдатель.
function* saga() {
  yield takeEvery(actionTypes.loginSaga, loginPage);
  yield takeEvery(actionTypes.logoutSaga, logoutPage);
  yield takeEvery(actionTypes.registerSaga, registerPage);
  yield takeEvery(ADD_POINT, addPointFetch);
  // action chto bi poluchit pointi
}



export default saga;
