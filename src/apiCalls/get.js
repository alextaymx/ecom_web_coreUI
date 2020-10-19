import axios from "axios";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api`;

export const getProductAPI = (token, id = "*", query = "") => {
  const URL = `${rootUrl}/products/get/${id}?${query}`;
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

export const getUserAPI = (token, id = "*", page = 1, status = 1) => {
  const URL = `${rootUrl}/users/get/${id}?status=${status}&page=${page}`;
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

export const getSupplierAPI = (token, id = "*", page = 1, status = "Active") => {
  const URL = `${rootUrl}/suppliers/get/${id}?page=${page}`;
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
