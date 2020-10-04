import axios from "axios";
import { logout } from "../actions";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api/`;

export const onLogin = (payload) => {
  const URL = `${rootUrl}login`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const onRegister = (payload) => {
  const URL = `${rootUrl}register`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const onLogout = (token) => {
  const URL = `${rootUrl}logout`;
  return axios
    .get(URL, {
      method: "POST/GET",
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const onLogoutv2 = (dispatch, history = null) => {
  localStorage.removeItem("loggedInUser");
  dispatch(logout());
  // history.push("/login");
};
