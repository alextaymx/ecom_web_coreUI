import axios from "axios";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api`;

export const createProductAPI = (payload, token) => {
  const URL = `${rootUrl}/products/create_product`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateProductAPI = (payload, token) => {
  const URL = `${rootUrl}/products/update_product`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateProductVarAPI = (payload, token) => {
  const URL = `${rootUrl}/products/update_productvar`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteProductAPI = (payload, token) => {
  const URL = `${rootUrl}/products/delete_product`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const deleteProductVarAPI = (payload, token) => {
  const URL = `${rootUrl}/products/delete_productvar`;
  return axios
    .post(URL, payload, {
      method: "POST/GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
