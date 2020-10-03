import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  // CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import React from "react";
// import { createProductVarAPI } from "../../../apiCalls/post";
// import { useSelector } from "react-redux";
import { startCase, pick, omit } from "lodash";
// const initialState = {
//   itemNo: "",
//   retailPrice: "",
//   supplyPrice: "",
//   supplyRate: "",
//   resale: "false",
// };

// const reducer = (state, { field, value }) => {
//   if (field === "reset") {
//     return initialState;
//   }
//   return {
//     ...state,
//     [field]: value,
//   };
// };

function CreateProductVarForm({
  fieldArr,
  handleFormSubmit,
  productVarOnChange,
  decrementStep,
  addProductVar,
}) {
  // const radioInput = pick(field, "resale");
  return (
    <>
      <CRow alignHorizontal="center">
        <CCol md="12">
          <CCard>
            <CCardHeader>Create Product Variation</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" onSubmit={handleFormSubmit}>
                {fieldArr.map((productVar, arrIndex) => {
                  const inputField = omit(
                    productVar,
                    "retailPrice",
                    "supplyPrice",
                    "resale",
                    "orderBy",
                    "releaseBy"
                  );
                  const monetaryInputField = pick(
                    productVar,
                    "retailPrice",
                    "supplyPrice"
                  );
                  const dateInputField = pick(productVar, "orderBy", "releaseBy");
                  return (
                    <CCard accentColor="info" key={arrIndex}>
                      <CCardHeader>{`Product Variation ${arrIndex + 1}`}</CCardHeader>
                      <CCardBody>
                        <CFormGroup row className="my-0">
                          {Object.keys(inputField).map((key, index) => {
                            // console.log(key, inputField[key], index, typeof key);
                            const displayName = startCase(key);
                            return (
                              <CCol sm="4" key={index}>
                                <CFormGroup>
                                  <CLabel htmlFor={key}>{displayName}</CLabel>
                                  <CInput
                                    type="text"
                                    id={key}
                                    name={key}
                                    // autoComplete="on"
                                    placeholder={`Enter ${displayName}`}
                                    value={inputField[key]}
                                    onChange={(e) => productVarOnChange(arrIndex, e)}
                                    required
                                  />
                                </CFormGroup>
                              </CCol>
                            );
                          })}
                          {Object.keys(monetaryInputField).map((key, index) => {
                            // console.log(key, inputField[key], index, typeof key);
                            const displayName = startCase(key);
                            return (
                              <CCol sm="2" key={index}>
                                <CFormGroup>
                                  <CLabel htmlFor={key}>{displayName}</CLabel>
                                  <CInputGroup>
                                    <CInputGroupPrepend>
                                      <CInputGroupText>RM</CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput
                                      type="text"
                                      id={key}
                                      name={key}
                                      // autoComplete="on"
                                      placeholder={`Enter ${displayName}`}
                                      value={monetaryInputField[key]}
                                      onChange={(e) => productVarOnChange(arrIndex, e)}
                                      required
                                    />
                                  </CInputGroup>
                                </CFormGroup>
                              </CCol>
                            );
                          })}
                          {Object.keys(dateInputField).map((key, index) => {
                            // console.log(key, inputField[key], index, typeof key);
                            const displayName = startCase(key);
                            return (
                              <CCol sm="2" key={index}>
                                <CFormGroup>
                                  <CLabel htmlFor="date-input">{displayName}</CLabel>

                                  <CInput
                                    type="date"
                                    id="date-input"
                                    name={key}
                                    placeholder="date"
                                    onChange={(e) => productVarOnChange(arrIndex, e)}
                                  />
                                </CFormGroup>
                              </CCol>
                            );
                          })}
                          {/* <CCol sm="4">
                            <CFormGroup>
                              <CLabel>Resale</CLabel>
                              <CFormGroup variant="custom-radio">
                                <CInputRadio
                                  custom
                                  id="resale-radio-yes"
                                  name={`resale${arrIndex}`}
                                  value="true"
                                  onChange={(e) => {
                                    const fakeEvent = {
                                      target: {
                                        name: "resale",
                                        value: e.target.value,
                                      },
                                    };
                                    console.log(arrIndex);
                                    productVarOnChange(arrIndex, fakeEvent);
                                  }}
                                  checked={productVar.resale === "true"}
                                />
                                <CLabel
                                  variant="custom-checkbox"
                                  htmlFor="resale-radio-yes">
                                  Yes
                                </CLabel>
                              </CFormGroup>
                              <CFormGroup variant="custom-radio">
                                <CInputRadio
                                  custom
                                  id="resale-radio-no"
                                  name={`resale${arrIndex}`}
                                  value="false"
                                  onChange={(e) => {
                                    const fakeEvent = {
                                      target: {
                                        name: "resale",
                                        value: e.target.value,
                                      },
                                    };
                                    console.log(arrIndex);
                                    productVarOnChange(arrIndex, fakeEvent);
                                  }}
                                  checked={productVar.resale === "false"}
                                />
                                <CLabel
                                  variant="custom-checkbox"
                                  htmlFor="resale-radio-no">
                                  No
                                </CLabel>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol> */}
                        </CFormGroup>
                      </CCardBody>
                    </CCard>
                  );
                })}
                <CFormGroup className="form-actions">
                  <CButton onClick={decrementStep} color="secondary">
                    Back
                  </CButton>
                  <CButton onClick={addProductVar} color="warning">
                    Add Variation
                  </CButton>
                  <CButton type="submit" color="primary">
                    Create
                  </CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default CreateProductVarForm;
