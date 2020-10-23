import React, { useReducer, useState } from "react";
import { createOrderAPI } from "../../apiCalls/post";
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

const initialState = {
  orderNumber: 66412,
  receiveNumber: 7199,
};

const reducer = (state, { action, field, value }) => {
  switch (action) {
    case "reset":
      return initialState;
    case "order":
      return {
        ...state,
        [field]: value,
      };

    default:
  }
};

function CreatePurchaseOrder() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;

  const [visible, setVisible] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);

  const orderOnChange = (e) => {
    dispatch({ action: "order", field: e.target.name, value: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorAlert(false);
    // console.log(state);
    createOrderAPI(state, token)
      .then((data) => {
        console.log("create order: ", data, state);
        dispatch({ action: "reset" });
        setVisible(5);
        // window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          setErrorAlert(true);
          console.log("error", error.response);
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
          <CCardHeader>Create order</CCardHeader>
          <CCardBody>
            <CAlert color="danger" show={errorAlert} closeButton>
              Failed to create order!
            </CAlert>
            <CAlert color="success" show={visible} closeButton onShowChange={setVisible}>
              Order created successfully! Dismissing in {visible} seconds...
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
                          onChange={orderOnChange}
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

export default CreatePurchaseOrder;
