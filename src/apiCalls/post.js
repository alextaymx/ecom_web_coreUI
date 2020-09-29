import axios from "axios";
const rootUrl = `${
  process.env.NODE_ENV === "production" ? "" : process.env.REACT_APP_BASE_URL
}/api`;

export const createProductVarAPI = (payload, token) => {
  const URL = `${rootUrl}/products/create_productvar`;
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
