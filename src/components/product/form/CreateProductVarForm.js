import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  // CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  // CInputRadio,
  CLabel,
  CRow,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";
import React from "react";
// import { createProductVarAPI } from "../../../apiCalls/post";
// import { useSelector } from "react-redux";
import { startCase, pick, omit } from "lodash";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { getSupplierAPI } from "../../../apiCalls/get";
import { onLogoutv2 } from "../../../apiCalls/auth";
import { AsyncPaginate } from "react-select-async-paginate";
import CIcon from "@coreui/icons-react";

function CreateProductVarForm({
  fieldArr,
  handleFormSubmit,
  productVarOnChange,
  decrementStep,
  addProductVar,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.user.token);
  // const [supplierData, setSupplierData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [fetchTrigger, setFetchTrigger] = useState(0);
  // const [supplier, supplierOnChange] = useState(null);

  const loadOptions = async (search, oldSuppliers, { page }) => {
    try {
      const responseJSON = await getSupplierAPI(token, "*", page);
      const newSuppliers = responseJSON.data.resultList.map((supplier) => ({
        value: supplier.id,
        label: `${supplier.id} - ${supplier.name}`,
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

  // useEffect(() => {
  //   setLoading(true);
  //   getSupplierAPI(token, "*", 1)
  //     .then(({ data }) => {
  //       console.log(data.resultList);
  //       const suppliers = data.resultList.map((supplier) => ({
  //         value: supplier.id,
  //         label: supplier.name,
  //       }));
  //       setSupplierData(suppliers);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         onLogoutv2(dispatch);
  //         // console.error("err response", error.response); // client received an error response (5xx, 4xx)
  //       } else if (error.request) {
  //         // console.error("err req", error.request); // client never received a response, or request never left
  //       } else {
  //         setTimeout(() => {
  //           setFetchTrigger(fetchTrigger + 1);
  //         }, 2000);
  //         // anything else // console.error("There was an error!", error);
  //       }
  //     });
  // }, [token, dispatch, fetchTrigger]);
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
                    "releaseBy",
                    "supplier"
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
                                    value={dateInputField[key]}
                                    onChange={(e) => productVarOnChange(arrIndex, e)}
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
                                value={fieldArr.supplier}
                                loadOptions={loadOptions}
                                defaultValue={{ value: "0", label: "0 - Lela Aufderhar" }}
                                onChange={({ value }) => {
                                  productVarOnChange(arrIndex, {
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

                          <CCol sm="2">
                            <CFormGroup>
                              <CLabel htmlFor="resale">Resale</CLabel>
                              <Select
                                name="resale"
                                id="resale"
                                // isSearchable
                                onChange={({ value }) => {
                                  productVarOnChange(arrIndex, {
                                    target: {
                                      name: "resale",
                                      value,
                                    },
                                  });
                                }}
                                // components={animatedComponents}
                                defaultValue={{ value: "false", label: "No" }}
                                // isMulti
                                options={[
                                  { value: "true", label: "Yes" },
                                  { value: "false", label: "No" },
                                ]}
                              />
                            </CFormGroup>
                          </CCol>
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
                      <CCardFooter>
                        <CButton onClick={decrementStep} color="secondary">
                          Back
                        </CButton>{" "}
                        <CButton
                          variant="outline"
                          onClick={addProductVar}
                          color="warning"
                          className="card-header-actions">
                          Add Variation
                        </CButton>
                      </CCardFooter>
                    </CCard>
                  );
                })}
                <CRow className="justify-content-end ">
                  <CFormGroup className="form-actions col-12 col-lg-2">
                    <CButton type="submit" color="primary" block>
                      Create
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

export default CreateProductVarForm;
