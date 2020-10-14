import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { onRegister } from "../../apiCalls/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("An error occured");
  let history = useHistory();

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    setVisible(false);
    if (!username || !password || !email || password !== repeatedPassword) {
      setLoading(false);
      return;
    }
    // console.log(username, email, password);
    onRegister({ username, email, password })
      .then(({ data }) => {
        // console.log("returned: ", data);
        setLoading(false);
        history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
          setAlertText(error.response.data.message);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          // anything else // console.error("There was an error!", error);
        }
        setVisible(true);
        setLoading(false);
      });
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatedPassword("");
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleCreate}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CAlert color="danger" show={visible}>
                    {alertText + " — Please register again!"}
                  </CAlert>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
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
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatedPassword}
                      onChange={(e) => setRepeatedPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton type="submit" color="success" block disabled={loading}>
                    {loading ? (
                      <div>
                        <span
                          className="spinner-grow spinner-grow-sm mr-3"
                          role="status"
                          aria-hidden="true"></span>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="12">
                    <Link to="/login">
                      <CButton
                        color="secondary"
                        className="mt-3 mb-1"
                        active
                        tabIndex={-1}
                        block>
                        Already have an account? Login Now
                      </CButton>
                    </Link>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
