import { call, put, takeEvery } from "redux-saga/effects";
import actionTypes from "../redux/actionTypes";
import history from "../heplers/history";
import {
  loginFetch,
  logoutFetch,
  registerFetch,
  loadingStart,
  loadingError,
  missedPersonFetch
} from "../actionCreators/actionCreatorSaga";
import { addPoint, setSagaState, showAlert } from "../redux/actions";
import { ADD_POINT, SET_SAGA_STATE, UPDATE_USER } from "../redux/types";
import { putCoordinates } from "../redux/actions";
const TOKEN = "ac85ebda-7107-4441-88aa-069cf0857ea8";


const fetchLogin = async ({ email, password }) => {
  try {
    const response = await (
      await fetch(`/profile/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
    ).json();
    if (response) {
      localStorage.setItem("userSession", response.status);
      localStorage.setItem("userName", response.userSession.login);
      localStorage.setItem("userId", response.userSession.id);
      return response;
    } else {
      alert("net nichego");
    }
  } catch (e) {
    alert("Ошибка, сервер недоступен");
  }
};

const fetchLogout = async () => {
  //try {
  const response = await fetch(`/profile/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (response.status) {
    localStorage.clear();
    return false;
  } else {
    alert("net nichego");
  }
  //} catch (e) {
  // console.message("Ошибка, сервер недоступен", e);
  // }
};

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
      if (response.status) {
        localStorage.setItem("userSession", response.status);
        localStorage.setItem("userName", response.userSession.login);
        localStorage.setItem("userId", response.userSession.id);
        return response;
      } else if (!response.status) {
        return response
      }
    } catch (e) {
      alert("Ошибка, сервер недоступен");
    }
  }
}


const getFetchSearchQuery = async (searchQuery) => {
  // console.log( 'searchQuery',searchQuery)
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${TOKEN}&geocode=${searchQuery.payload}`
    );
    const result = await response.json();
    const coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
      " "
    );
    const latitude = coordinates[1];
    const longitude = coordinates[0];

    // console.log('result', result)
    // console.log('coordinates', coordinates)
    // console.log('latitude', latitude)
    // console.log('longitude', longitude)
    // let placemark = new YMaps.Placemark([latitude, longitude], {})
    // if (coordinates) Map.geoObjects.add(placemark);
    return [latitude, longitude];
  } catch (error) {
    console.error(error.message);
  }
};

// Функция-работник.
function* loginPage(action) {
  try {
    yield put(loadingStart());

    const login = yield call(fetchLogin, {
      email: action.email,
      password: action.password,
    });
    yield put(loginFetch(login));
    yield put(history.push("/profile"));
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* logoutPage(action) {
  try {
    const logout = yield call(fetchLogout);
    console.log(logout);
    yield put(logoutFetch(logout));
    //yield put(history.push('/'))
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* registerPage(action) {
  try {
    yield put(showAlert(null))

    const result = yield call(fetchRegister, {
      name: action.name,
      email: action.email,
      password: action.password,
      repeadPassword: action.repeadPassword
    });
    console.log(result);
    if (!result.status) {
      yield put(showAlert(result.message))
      //history.push('/registration')
    } else {
      yield put(registerFetch(result));
      history.push('/profile')
    }
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

const fetchPutCoordinates = async (obj) => {
  return await (
    await fetch("/upload/coordinates", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: obj.userId,
        coordinates: obj.coordinates,
      }),
    })
  ).json();
};

const fetchMissedPpl = async () => {
  return await (
    await fetch("/upload/missedpeople", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
};

const personFetch = async (url) => {
  const response = await fetch('/upload/missedpersonOne', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: url,
    }),
  })
  const result = await response.json();
  return result;
}

function* addPointFetch(action) {
  try {
    const coordinates = yield call(getFetchSearchQuery, action); //[latitude, longitude]
    const obj = { coordinates: coordinates, userId: action.id };

    const updated = yield call(fetchPutCoordinates, obj);
    const poteryashes = yield call(fetchMissedPpl);
    yield put(putCoordinates(poteryashes));
    console.log(poteryashes);
  } catch (error) {
    yield put(loadingError(error.message));
  }
}

function* setStateSaga(action) {
  try {
    const poteryashes = yield call(fetchMissedPpl);
    yield put(putCoordinates(poteryashes));
  } catch (e) {
    yield put(loadingError(e.message));
  }
}

function* missedPersonPage(action) {
  try {
    const result = yield call(personFetch, action.id);
    yield put(missedPersonFetch(result))
  } catch (e) {
    yield put(loadingError(e.message))
  }
}


const fetchUpdUser = async (action, coordinates) => {
  console.log(action)
  const id = action.id;
  const obj = action;
  const user = action.user;
  const payment = action.payment;
  const login = payment.login;
  const password = payment.password;
  const lastName = user.lastName;
  const firstName = user.name;
  const address = user.address;
  const email = payment.email
  debugger
  return await (
    await fetch("/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        login,
        password,
        firstName,
        lastName,
        address,
        coordinates,
        email
      }),
    })
  ).json();
};

function* updateUser(id) {
  try {
    const searchQuery = { payload: id.user.address };
    const coordinates = yield call(getFetchSearchQuery, searchQuery);

    const user = yield call(fetchUpdUser, id, coordinates);
    console.log(user);
  } catch (e) {
    console.error(e.message);
  }
}

// Функция-наблюдатель.
function* saga() {
  yield takeEvery(actionTypes.loginSaga, loginPage);
  yield takeEvery(actionTypes.logoutSaga, logoutPage);
  yield takeEvery(actionTypes.registerSaga, registerPage);
  yield takeEvery(ADD_POINT, addPointFetch);
  yield takeEvery(SET_SAGA_STATE, setStateSaga)
  yield takeEvery(actionTypes.missedPersonSaga, missedPersonPage)
  yield takeEvery(UPDATE_USER, updateUser);
  // action chto bi poluchit pointi
}

export default saga;
