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
import React from "react";
import { startCase } from "lodash";
import CIcon from "@coreui/icons-react";

function CreateProductForm({
  field,
  productOnChange,
  incrementStep,
  visible,
  setVisible,
}) {
  return (
    <>
      <CRow alignHorizontal="center">
        <CCol md="12">
          <CCard>
            <CCardHeader>Create Product</CCardHeader>
            <CCardBody>
              <CAlert
                color="success"
                show={visible}
                closeButton
                onShowChange={setVisible}>
                Product created successfully! {visible}
              </CAlert>
              <CForm onSubmit={incrementStep}>
                <CFormGroup row className="my-0">
                  {Object.keys(field).map((key, index) => {
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
                            value={field[key]}
                            onChange={productOnChange}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                    );
                  })}
                </CFormGroup>
                <CRow className="justify-content-end ">
                  <CFormGroup className="form-actions col-12 col-lg-2">
                    <CButton type="submit" color="primary" block>
                      Next
                      <CIcon name="cil-arrow-right" className="ml-2" />
                    </CButton>
                  </CFormGroup>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

export default CreateProductForm;
