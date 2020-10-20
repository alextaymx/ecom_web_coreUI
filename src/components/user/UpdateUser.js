import {
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
import React, { useReducer } from "react";
// import { createProductVarAPI } from "../../../apiCalls/post";
// import { useSelector } from "react-redux";
import { startCase, omit } from "lodash";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import produce from "immer";
import _ from "lodash";
import { updateUserAPI } from "../../apiCalls/post";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PERMISSION } from "./constant";
const animatedComponents = makeAnimated();
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
    case "user":
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
const options = Object.keys(PERMISSION).map((key, index) => ({
  value: PERMISSION[key],
  label: key,
}));
function UpdateSupplier() {
  // const radioInput = pick(field, "resale");
  const history = useHistory();
  const location = useLocation();
  const token = useSelector((state) => state.userInfo.user.token);
  const initialState = omit(
    location.state,
    "id",
    "updatedAt",
    "createdAt",
    "isActivated"
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const userOnChange = (e) => {
    dispatch({
      action: "user",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const changedKey = changedKeys(state, initialState);
    if (changedKey.length !== 0) {
      const updatePayload = {
        id: location.state.id,
        ..._.pick(state, changedKey),
      };
      console.log(updatePayload, "special");
      updateUserAPI(updatePayload, token)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {});
    }
    history.goBack();
  };
  return (
    <>
      {location.state ? (
        <CRow alignHorizontal="center">
          <CCol md="12">
            <CCard>
              <CCardHeader>Edit User Details</CCardHeader>
              <CCardBody>
                <CForm action="" method="post" onSubmit={handleFormSubmit}>
                  {state && (
                    <CCard accentColor="info">
                      <CCardHeader>{`User id: ${location.state.id}`}</CCardHeader>
                      <CCardBody>
                        <CFormGroup row className="my-0">
                          {Object.keys(state).map((key, index) => {
                            // console.log(key, inputField[key], index, typeof key);
                            const displayName = startCase(key);
                            state[key] = state[key] === null ? "" : state[key];
                            switch (key) {
                              case "permissions":
                                return (
                                  <CCol sm="4" key={index}>
                                    <CFormGroup>
                                      <CLabel htmlFor={key}>{displayName}</CLabel>
                                      <Select
                                        id={key}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        defaultValue={state[key].map(
                                          (value, index) => options[index]
                                        )}
                                        isMulti
                                        options={options}
                                        onChange={(selectedArray) => {
                                          console.log(selectedArray);
                                          const value = selectedArray
                                            ? selectedArray.map((item) => item.value)
                                            : [];
                                          userOnChange({
                                            target: {
                                              name: key,
                                              value,
                                            },
                                          });
                                        }}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                );
                              default:
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
                                        value={state[key]}
                                        onChange={(e) => userOnChange(e)}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                );
                            }
                          })}
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
        <Redirect from="/updateUser" to="/dashboard" />
      )}
    </>
  );
}

export default UpdateSupplier;
