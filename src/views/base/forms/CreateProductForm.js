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
import React from "react";
import { startCase } from "lodash";

function CreateProductForm({ field, onChange, incrementStep }) {
  // const radioInput = pick(field, "resale");
  return (
    <>
      <CRow alignHorizontal="center">
        <CCol md="12">
          <CCard>
            <CCardHeader>Create Product</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" onSubmit={incrementStep}>
                <CFormGroup row className="my-0">
                  {Object.keys(field).map((key, index) => {
                    // console.log(key, field[key], index, typeof key);
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
                            value={field[key]}
                            onChange={onChange}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                    );
                  })}
                </CFormGroup>

                <CFormGroup className="form-actions">
                  <CButton type="submit" color="primary">
                    Next step
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

export default CreateProductForm;
