import { createStore } from "redux";
import { combineReducers } from "redux";

const initialState = {
  sidebarShow: "responsive",
};

const initialUserState = {
  isLogin: false,
  token: null,
  user: {},
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
// action object is destructured to type and others(probably payload)
const userInfo = (state = initialUserState, { type, ...rest }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, user: rest.payload, isLogin: true };
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
