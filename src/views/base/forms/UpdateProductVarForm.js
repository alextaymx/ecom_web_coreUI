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
import React, { useReducer } from "react";
// import { createProductVarAPI } from "../../../apiCalls/post";
// import { useSelector } from "react-redux";
import { startCase, pick, omit } from "lodash";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import produce from "immer";
import _ from "lodash";
import { updateProductVarAPI } from "../../../apiCalls/post";
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

const reducer = (state, { action, field, value, initialProductState }) => {
  switch (action) {
    case "reset":
      return initialProductState;
    case "productVar":
      return {
        ...state,
        [field]: value,
      };
    default:
      return state;
  }
};
const changedKeys = (o1, o2) => {
  var keys = _.union(_.keys(o1), _.keys(o2));
  return _.filter(keys, (key) => {
    // return !_.eq(o1[key].toString(), o2[key].toString());
    return o1[key] !== o2[key];
  });
};
function UpdateProductVarForm() {
  // const radioInput = pick(field, "resale");
  const history = useHistory();
  const location = useLocation();
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, location.state);
  const productVarOnChange = (e) => {
    dispatch({
      action: "productVar",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const changedKey = changedKeys(state, location.state);
    if (changedKey.length !== 0) {
      const updatePayload = { product_id: state.id, ..._.pick(state, changedKey) };

      updateProductVarAPI(updatePayload, token)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {});
    }
    history.goBack();
  };
  const inputField = omit(
    state,
    "id",
    "retailPrice",
    "supplyPrice",
    "resale",
    "orderBy",
    "releaseBy",
    "orders"
  );
  const monetaryInputField = pick(state, "retailPrice", "supplyPrice");
  const dateInputField = pick(state, "orderBy", "releaseBy");
  return (
    <>
      {location.state ? (
        <CRow alignHorizontal="center">
          <CCol md="12">
            <CCard>
              <CCardHeader>Edit Product Variation</CCardHeader>
              <CCardBody>
                <CForm action="" method="post" onSubmit={handleFormSubmit}>
                  {state && (
                    <CCard accentColor="info">
                      <CCardHeader>{`Product Variation id: ${state.id}`}</CCardHeader>
                      <CCardBody>
                        <CFormGroup row className="my-0">
                          {Object.keys(inputField).map((key, index) => {
                            // console.log(key, inputField[key], index, typeof key);
                            const displayName = startCase(key);
                            inputField[key] =
                              inputField[key] === null ? "" : inputField[key];

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
                                    onChange={(e) => productVarOnChange(e)}
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
                                      onChange={(e) => productVarOnChange(e)}
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
                              <CCol sm="4" key={index}>
                                <CFormGroup>
                                  <CLabel htmlFor="date-input">{displayName}</CLabel>
                                  <CInput
                                    type="date"
                                    id="date-input"
                                    name={key}
                                    placeholder="date"
                                    onChange={(e) => productVarOnChange(e)}
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
                  )}
                  <CFormGroup className="form-actions">
                    <CButton type="submit" color="primary">
                      Update
                    </CButton>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      ) : (
        <Redirect from="/updateProductVarForm" to="/dashboard" />
      )}
    </>
  );
}

export default UpdateProductVarForm;
