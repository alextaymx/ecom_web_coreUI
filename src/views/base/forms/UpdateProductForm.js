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
import { createProductAPI } from "../../../apiCalls/post";
import { useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";

const initialState = {
  itemNo: "",
  retailPrice: "",
  supplyPrice: "",
  supplyRate: "",
  resale: "false",
};

const reducer = (state, { field, value }) => {
  if (field === "reset") {
    return initialState;
  }
  return {
    ...state,
    [field]: value,
  };
};

function CreateProductVarForm() {
  const token = useSelector((state) => state.userInfo.user.token);
  getProductAPI("0", token)
    .then(({ data }) => {
      console.log("returned: ", data.resultList);
      // dispatch(logout());
    })
    .catch((error) => {
      if (error.response) {
        // console.log(token);
        // console.error("err response", error.response); // client received an error response (5xx, 4xx)
      } else if (error.request) {
        // console.error("err req", error.request); // client never received a response, or request never left
      } else {
        // anything else // console.error("There was an error!", error);
      }
    });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createProductAPI(state, token)
      .then((data) => {
        console.log("returned data: ", data, state);
        dispatch({ field: "reset" });
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
    <>
      <CRow alignHorizontal="center">
        <CCol md="12">
          <CCard>
            <CCardHeader>Create Product Variation</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" onSubmit={handleFormSubmit}>
                <CFormGroup row className="my-0">
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="itemNo">Item Number</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-asterisk" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          id="itemNo"
                          name="itemNo"
                          autoComplete="on"
                          placeholder="Enter item number"
                          value={itemNo}
                          onChange={onChange}
                          required
                        />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="retailPrice">Retail Price</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>RM</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="retailPrice"
                          placeholder="Enter retail price"
                          name="retailPrice"
                          value={retailPrice}
                          onChange={onChange}
                        />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="itemNo">Supply Price</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>RM</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="supplyPrice"
                          name="supplyPrice"
                          placeholder="Enter supply price"
                          value={supplyPrice}
                          onChange={onChange}
                          required
                        />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="supplyRate">Supply Rate</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>RM</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="supplyRate"
                          placeholder="Enter supply rate"
                          name="supplyRate"
                          value={supplyRate}
                          onChange={onChange}
                          required
                        />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel>Resale</CLabel>
                      <CFormGroup variant="custom-radio">
                        <CInputRadio
                          custom
                          id="resale-radio-yes"
                          name="resale"
                          value="true"
                          onChange={onChange}
                          checked={resale === "true"}
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
                          checked={resale === "false"}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="resale-radio-no">
                          No
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup className="form-actions">
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
