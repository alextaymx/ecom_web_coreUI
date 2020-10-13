import React, { useReducer, useState } from "react";
import { createSupplierAPI } from "../../../apiCalls/post";
import { useSelector } from "react-redux";
import { omit } from "lodash";
import { produce } from "immer";

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
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { startCase } from "lodash";

const initialSupplierState = {
  name: "Deanna Senger",
  email: "Sydney_Price@gmail.com",
  faxNo: "(274) 930-3371 x412",
  telNo: "1-470-929-0557 x552",
  website: "https://ali.net",
  address: "881 Lamar Isle",
};

const reducer = (state, { action, field, value }) => {
  switch (action) {
    case "reset":
      return initialSupplierState;
    case "supplier":
      return {
        ...state,
        [field]: value,
      };

    default:
  }
};

function CreateSupplier() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialSupplierState);
  // const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;

  const [visible, setVisible] = useState(0);

  const supplierOnChange = (e) => {
    dispatch({ action: "supplier", field: e.target.name, value: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    createSupplierAPI({ ...state, products: [0, 1] }, token)
      .then((data) => {
        console.log("returned data: ", data, state);
        dispatch({ action: "reset" });
        setVisible(5);
        // window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
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
          <CCardHeader>Add supplier</CCardHeader>
          <CCardBody>
            <CAlert color="success" show={visible} closeButton onShowChange={setVisible}>
              Supplier added successfully! {visible}
            </CAlert>
            <CForm action="" method="post" onSubmit={handleFormSubmit}>
              <CFormGroup row className="my-0">
                {Object.keys(initialSupplierState).map((key, index) => {
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
                          value={initialSupplierState[key]}
                          onChange={supplierOnChange}
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
