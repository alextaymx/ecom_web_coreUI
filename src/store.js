import { createStore } from "redux";
import { combineReducers } from "redux";

const initialState = {
  sidebarShow: "responsive",
};

const initialUserState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || {},
  isLogin: JSON.parse(localStorage.getItem("loggedInUser")) ? true : false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const userInfo = (state = initialUserState, { type, payload, ...rest }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload.user, isLogin: true };
    case "LOGOUT":
      return { ...state, user: {}, isLogin: false };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  changeState,
  userInfo,
});

const store = createStore(
  allReducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
