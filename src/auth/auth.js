import Axios from "axios";

const loginReq = () => {
  const credentials = {
    email: "l_weixiang@outlook.com",
    password: "testing123",
  };
  Axios.post("https://localhost:3001/login", credentials)
    .then((response) => this.setState({ articleId: response.data.id }))
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

const logoutReq = () => {
  const credentials = {
    email: "l_weixiang@outlook.com",
    password: "testing123",
  };
  const headers = {
    Authorization: "Bearer my-token",
    "My-Custom-Header": "foobar",
  };
  Axios.post("https://localhost:3001/login", credentials, { headers })
    .then((response) => this.setState({ articleId: response.data.id }))
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export default { loginReq, logoutReq };
