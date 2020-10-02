import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CHeader,
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
                    "resale"
                  );
                  const monetaryInputField = pick(
                    productVar,
                    "retailPrice",
                    "supplyPrice"
                  );
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
                              <CCol sm="4" key={index}>
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

                          <CCol sm="4">
                            <CFormGroup>
                              <CLabel>Resale</CLabel>
                              <CFormGroup variant="custom-radio">
                                <CInputRadio
                                  custom
                                  id="resale-radio-yes"
                                  name="resale"
                                  value="true"
                                  onChange={(e) => productVarOnChange(arrIndex, e)}
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
                                  name="resale"
                                  value="false"
                                  onChange={(e) => productVarOnChange(arrIndex, e)}
                                  checked={productVar.resale === "false"}
                                />
                                <CLabel
                                  variant="custom-checkbox"
                                  htmlFor="resale-radio-no">
                                  No
                                </CLabel>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
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
