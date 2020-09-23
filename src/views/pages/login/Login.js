import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { login } from "../../../actions";
import axios from "axios";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("An error occured");
  const dispatch = useDispatch();
  // functions

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVisible(false);
    if (!email || !password) {
      setLoading(false);
      return;
    }
    const credentials = {
      email,
      password,
    };

    axios
      .post("http://localhost:3001/login", credentials)
      .then(({ data }) => {
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        dispatch(login(data.data));
        setLoading(false);
        history.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          setAlertText(error.response.data.message);
          // console.error("err response", error.response);
          // client received an error response (5xx, 4xx)
        } else if (error.request) {
          setAlertText("Server error");
          // console.error("err req", error.request);
          // client never received a response, or request never left
        } else {
          setAlertText("An error occured");
          // anything else
          // console.error("There was an error!", error);
        }
        setVisible(true);
        setLoading(false);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CAlert color="danger" show={visible}>
                      {alertText + " — Please login again!"}
                    </CAlert>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                          disabled={loading}>
                          {loading ? (
                            <>
                              <span
                                className="spinner-grow spinner-grow-sm mr-2"
                                role="status"
                                aria-hidden="true"></span>
                              <span>Logging in...</span>
                            </>
                          ) : (
                            <span>Login</span>
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
