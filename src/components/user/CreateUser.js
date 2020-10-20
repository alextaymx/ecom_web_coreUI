import React, { useReducer, useState } from "react";
import { createUserAPI } from "../../apiCalls/post";
import { useSelector } from "react-redux";

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  // CInputGroup,
  // CInputGroupAppend,
  // CInputGroupPrepend,
  // CInputGroupText,
  // CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";
import { startCase } from "lodash";

const initialUserState = {
  username: "iAmNew",
  password: "testing",
  email: "helloworld@gmail.com",
};

const reducer = (state, { action, field, value }) => {
  switch (action) {
    case "reset":
      return initialUserState;
    case "user":
      return {
        ...state,
        [field]: value,
      };

    default:
  }
};

function CreateSupplier() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialUserState);
  // const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;

  const [visible, setVisible] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);

  const userOnChange = (e) => {
    dispatch({ action: "user", field: e.target.name, value: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorAlert(false);
    console.log(state);
    createUserAPI(state, token)
      .then((data) => {
        console.log("returned data: ", data, state);
        dispatch({ action: "reset" });
        setVisible(5);
        // window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          setErrorAlert(true);
          console.log(error.response);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          // anything else // console.error("There was an error!", error);
        }
      });
  };
  return (
    <CRow alignHorizontal="center">
      <CCol md="12">
        <CCard>
          <CCardHeader>Add user</CCardHeader>
          <CCardBody>
            <CAlert color="danger" show={errorAlert} closeButton>
              Failed to create user!
            </CAlert>
            <CAlert color="success" show={visible} closeButton onShowChange={setVisible}>
              User added successfully! Dismissing in {visible} seconds...
            </CAlert>
            <CForm action="" method="post" onSubmit={handleFormSubmit}>
              <CFormGroup row className="my-0">
                {Object.keys(state).map((key, index) => {
                  // console.log(key, field[key], index, typeof key);
                  const displayName = startCase(key);
                  return (
                    <CCol sm="6" key={index}>
                      <CFormGroup>
                        <CLabel htmlFor={key}>{displayName}</CLabel>
                        <CInput
                          type="text"
                          id={key}
                          name={key}
                          // autoComplete="on"
                          placeholder={`Enter ${displayName}`}
                          value={state[key]}
                          onChange={userOnChange}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  );
                })}
              </CFormGroup>

              <CFormGroup className="form-actions">
                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </CFormGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default CreateSupplier;
