import actionTypes from "../redux/actionTypes";

const initialState = {
  isLoading: null,
  url: null,
  errorMessage: null,
  loginSessions: false,
  src: null,
  person: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadingStart:
      return {
        ...state,
        isLoading: true,
        url: null,
        errorMessage: null,
      };
    case actionTypes.loadingSuccess:
      return {
        ...state,
        url: action.url,
        isLoading: null,
        errorMessage: null,
      };
    case actionTypes.loadingError:
      return {
        ...state,
        errorMessage: action.errorMessage,
        url: null,
        isLoading: null,
      };
    case actionTypes.loginFetch:
      return {
        ...state,
        errorMessage: null,
        url: null,
        isLoading: null,
        loginSessions: true,
      };
    case actionTypes.registerFetch:
      return {
        ...state,
        errorMessage: null,
        url: null,
        isLoading: null,
        loginSessions: true,
      };
    case actionTypes.logoutFetch:
      return {
        ...state,
        errorMessage: null,
        url: null,
        isLoading: null,
        loginSessions: null,
      };
    case "IMAGE/SET_IMAGE":
      return {
        ...state,
        src: action.src,
      };
    case actionTypes.missedPersonFetch:
      return {
        ...state,
        person: action.person,
      };
    default:
      return state;
  }
};

export default reducer;
