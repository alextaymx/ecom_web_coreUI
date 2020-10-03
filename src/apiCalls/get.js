import axios from "axios";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api`;

export const getProductAPI = (token, payload = "*") => {
  const URL = `${rootUrl}/products/get/${payload}?page=1`;
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

export const getProductVarAPI = (token, payload = "*") => {
  const URL = `${rootUrl}/products/getVar?product_id=${payload}`;
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
