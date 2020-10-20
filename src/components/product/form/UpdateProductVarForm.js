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
// import CIcon from "@coreui/icons-react";
import React, { useReducer } from "react";
// import { createProductVarAPI } from "../../../apiCalls/post";
// import { useSelector } from "react-redux";
import { startCase, pick, omit } from "lodash";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import produce from "immer";
import _ from "lodash";
import { updateProductVarAPI } from "../../../apiCalls/post";
import { getSupplierAPI } from "../../../apiCalls/get";
import { onLogoutv2 } from "../../../apiCalls/auth";
// import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

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

  const initialState = location.state && {
    ...location.state,
    ...(location.state.supplier && { supplier: location.state.supplier.id }),
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const productVarOnChange = (e) => {
    dispatch({
      action: "productVar",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const loadOptions = async (search, oldSuppliers, { page }) => {
    try {
      const responseJSON = await getSupplierAPI(token, "*", page);
      const newSuppliers = responseJSON.data.resultList.map((supplier) => ({
        value: supplier.id,
        label: `${supplier.name} [${supplier.id}]`,
      }));
      const hasMore = page !== responseJSON.data.totalPage;
      return {
        options: newSuppliers,
        hasMore,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      if (error.response) {
        onLogoutv2(dispatch);
        // console.error("err response", error.response); // client received an error response (5xx, 4xx)
      }
      return { options: [] };
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const changedKey = changedKeys(state, location.state);
    // due to mutation to the location.state prop , it will always update supplier
    // can be considered as a performance bug
    if (changedKey.length !== 0) {
      const updatePayload = { product_id: state.id, ..._.pick(state, changedKey) };
      // console.log(updatePayload);
      // console.log(location.state);
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
    "orders",
    "supplier",
    "status"
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
                          <CCol sm="4">
                            <CFormGroup>
                              <CLabel htmlFor="supplier">Supplier</CLabel>
                              <AsyncPaginate
                                isSearchable
                                name="supplier"
                                id="supplier"
                                loadOptions={loadOptions}
                                defaultValue={
                                  location.state.supplier && {
                                    value: state.supplier,
                                    label: `${location.state.supplier.name} [${state.supplier}]`,
                                  }
                                }
                                onChange={({ value }) => {
                                  productVarOnChange({
                                    target: {
                                      name: "supplier",
                                      value,
                                    },
                                  });
                                }}
                                additional={{
                                  page: 1,
                                }}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol sm="4">
                            <CFormGroup>
                              <CLabel>Resale</CLabel>
                              <CFormGroup variant="custom-radio">
                                <CInputRadio
                                  custom
                                  id="resale-radio-yes"
                                  name={`resale`}
                                  value="true"
                                  onChange={(e) => {
                                    productVarOnChange(e);
                                  }}
                                  checked={
                                    state.resale === true || state.resale === "true"
                                  }
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
                                  name={`resale`}
                                  value="false"
                                  onChange={(e) => {
                                    productVarOnChange(e);
                                  }}
                                  checked={
                                    state.resale === false || state.resale === "false"
                                  }
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
