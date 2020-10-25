import React, { useEffect, useReducer, useState } from "react";
import { createOrderAPI } from "../../apiCalls/post";
import { useSelector } from "react-redux";
import {
  CAlert,
  CButton,
  CCallout,
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
import { startCase } from "lodash";
import { ORDER_OPTIONS, ORDER_TYPE } from "./constant";
import { getCountryAPI, getProductAPI } from "../../apiCalls/get";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import ProductVariantOptions from "./ProductVariantOptions";
import ProductOptions from "./ProductOptions";

const initialState = {
  // type: ORDER_TYPE.Purchase_Order,
  // productVariant: "",
  referenceNumber: "66412",
  totalPrice: 20.0,
  remarks: "",
  quantity: 20,
  recipientName: "Alex",
  // country: "",
  // contactNumber: "",
  // address: "",
  shippingFee: 10.0,
  shippingType: "",
};
// const productVar = {
//   productVarID: 0,
//   itemNo: "15168",
//   title: "Small Fresh Shoes",
//   supplier: "Peggy Kautzer I",
// };
const reducer = (state, { action, field, value }) => {
  switch (action) {
    case "reset":
      return initialState;
    case "order":
      return {
        ...state,
        [field]: value,
      };

    default:
  }
};

function CreatePurchaseOrder() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [visible, setVisible] = useState(0);
  const [errorAlert, setErrorAlert] = useState(false);
  const [countryCode, setCountryCode] = useState([]);
  // const [productData, setProductData] = useState(initialState);
  const [productVar, setProductVar] = useState({});
  const [product, setProduct] = useState({});
  const orderOnChange = (e) => {
    dispatch({ action: "order", field: e.target.name, value: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorAlert(false);
    createOrderAPI(state, token)
      .then((data) => {
        console.log("create order: ", data, state);
        dispatch({ action: "reset" });
        setVisible(5);
        // window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          setErrorAlert(true);
          console.log("error", error.response);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          // anything else // console.error("There was an error!", error);
        }
      });
  };
  useEffect(() => {
    const getCountryCode = async () => {
      const {
        data: { resultList },
      } = await getCountryAPI(token);
      // const formattedResult = resultList.map((item) => {
      //   return { label: item.name, value: item.code };
      // });
      setCountryCode(resultList);
    };
    getCountryCode();
  }, [token]);

  return (
    <CRow alignHorizontal="center">
      <CCol md="12">
        <CCard>
          <CCardHeader>Create purchase order</CCardHeader>
          <CCardBody>
            <CAlert color="danger" show={errorAlert} closeButton>
              Failed to create order!
            </CAlert>
            <CAlert color="success" show={visible} closeButton onShowChange={setVisible}>
              Purchase Order created successfully! Dismissing in {visible} seconds...
            </CAlert>
            <CForm action="" method="post" onSubmit={handleFormSubmit}>
              <CFormGroup row className="my-0">
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel htmlFor="country">Order Type</CLabel>
                    <Select
                      name="orderOptions"
                      id="orderOptions"
                      onChange={({ value }) => {
                        // dispatch({ action: "reset" });
                        orderOnChange({
                          target: {
                            name: "type",
                            value,
                          },
                        });
                      }}
                      // defaultValue={{ name: "Malaysia", code: "MY" }}
                      options={ORDER_OPTIONS}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="12">
                  <CCallout color="primary">
                    <CRow>
                      {state.type === 1 && (
                        <ProductVariantOptions
                          token={token}
                          productVar={productVar}
                          setProductVar={setProductVar}
                          orderOnChange={orderOnChange}
                        />
                      )}
                      {state.type === 2 && (
                        <ProductOptions
                          token={token}
                          productVar={product}
                          setProductVar={setProduct}
                          orderOnChange={orderOnChange}
                        />
                      )}
                    </CRow>
                  </CCallout>
                </CCol>

                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="country">Country</CLabel>
                    <Select
                      name="country"
                      id="country"
                      onChange={({ code }) => {
                        orderOnChange({
                          target: {
                            name: "country",
                            value: code,
                          },
                        });
                      }}
                      // defaultValue={{ name: "Malaysia", code: "MY" }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.code}
                      options={countryCode}
                    />
                  </CFormGroup>
                </CCol>

                {Object.keys(initialState).map((key, index) => {
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
                          value={state[key]}
                          onChange={orderOnChange}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  );
                })}
              </CFormGroup>

              <CFormGroup className="form-actions">
                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </CFormGroup>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default CreatePurchaseOrder;
