// import axios from "axios";

// const loginReq = () => {
//   const credentials = {
//     email: "l_weixiang@outlook.com",
//     password: "testing123",
//   };
//   let data;
//   axios
//     .post("http://localhost:3001/login", credentials)
//     .then((response) => {
//       data = response.data.data;
//     })
//     .catch((error) => {
//       console.error("There was an error!", error);
//     });
//   return data;
// };

// const logoutReq = () => {
//   const credentials = {
//     email: "l_weixiang@outlook.com",
//     password: "testing123",
//   };
//   const headers = {
//     Authorization: "Bearer my-token",
//     "My-Custom-Header": "foobar",
//   };
//   axios
//     .post("https://localhost:3001/login", credentials, { headers })
//     .then((response) => this.setState({ articleId: response.data.id }))
//     .catch((error) => {
//       console.error("There was an error!", error);
//     });
// };

// export { loginReq, logoutReq };
