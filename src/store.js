import { createStore } from "redux";
import { combineReducers } from "redux";

const initialState = {
  sidebarShow: "responsive",
};

const initialLogin = {
  isLoggedIn: false,
  token: null,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const userLogin = (state = initialLogin, action) => {
  switch (action) {
    case "SIGN_IN":
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  changeState,
  userLogin,
});

const store = createStore(allReducers);
export default store;
