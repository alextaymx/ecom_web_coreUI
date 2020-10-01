import axios from "axios";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api`;

export const getProductAPI = (payload, token) => {
  const URL = `${rootUrl}/products/getVar/${payload}`;
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
