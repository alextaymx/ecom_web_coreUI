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

function CreateProductVarForm({ field, handleFormSubmit, onChange, decrementStep }) {
  const inputField = omit(field, "retailPrice", "supplyPrice", "resale");
  const monetaryInputField = pick(field, "retailPrice", "supplyPrice");
  // const radioInput = pick(field, "resale");
  return (
    <>
      <CRow alignHorizontal="center">
        <CCol md="12">
          <CCard>
            <CCardHeader>Create Product Variation</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" onSubmit={handleFormSubmit}>
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
                            onChange={onChange}
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
                              onChange={onChange}
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
                          onChange={onChange}
                          checked={field.resale === "true"}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="resale-radio-yes">
                          Yes
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio">
                        <CInputRadio
                          custom
                          id="resale-radio-no"
                          name="resale"
                          value="false"
                          onChange={onChange}
                          checked={field.resale === "false"}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="resale-radio-no">
                          No
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup className="form-actions">
                  <CButton onClick={decrementStep} color="secondary">
                    Back
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
