// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormGroup,
//   CInput,
//   CInputGroup,
//   CInputGroupAppend,
//   CInputGroupPrepend,
//   CInputGroupText,
//   CInputRadio,
//   CLabel,
//   CRow,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";
import React, { useReducer, useState } from "react";
import { createProductAPI } from "../../../apiCalls/post";
import { useSelector } from "react-redux";
import CreateProductVarForm from "./CreateProductVarForm";
import CreateProductForm from "./CreateProductForm";
import { omit } from "lodash";
import { produce } from "immer";
// import { useLocation } from "react-router-dom";

// const initialState = {
//   itemNo: "",
//   title: "",
//   chineseTitle: "",
//   version: "",
//   brand: "",
//   numberOfKind: "",
//   remarks: "",
//   package: "",
//   packageSize: "",
//   manufacturer: "",
//   moq: "",
//   ct: "",
//   orderBy: "",
//   releaseBy: "",
//   order: "",
//   supplier: "",
//   retailPrice: "",
//   supplyPrice: "",
//   supplyRate: "",
//   resale: "false",
// };
// const initialProductState = {
//   masterSKU: "",
//   remarks: "",
//   variations: [initialState],
// };
const initialState = {
  itemNo: "123",
  title: "Cat",
  chineseTitle: "Alibaba",
  image: "https://picsum.photos/200",
  version: "v1.2",
  brand: "Wow",
  numberOfKind: "1",
  remarks: "Faulty",
  package: "Node package",
  packageSize: "Big",
  manufacturer: "Ecom",
  moq: "1",
  ct: "2",
  orderBy: "2020-01-01",
  releaseBy: "2020-01-01",
  orderType: "Special",
  orders: "a",
  supplier: "1",
  retailPrice: "999",
  supplyPrice: "888",
  supplyRate: "777",
  resale: "false",
};
const initialProductState = {
  masterSku: "A123",
  remarks: "wow",
  variations: [initialState],
};

const reducer = (state, { action, field, value, index }) => {
  switch (action) {
    case "reset":
      return initialProductState;
    case "addVar":
      return {
        ...state,
        variations: [...state.variations, initialState],
      };
    case "product":
      return {
        ...state,
        [field]: value,
      };
    case "productVar":
      return {
        ...state,
        variations: produce(state.variations, (draft) => {
          draft[index][field] = value;
        }),
      };

    default:
  }
};

function CreateProduct() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialProductState);
  // const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(0);
  const incrementStep = (e) => {
    e.preventDefault();
    setStep(Math.min(step + 1, 2));
  };
  const decrementStep = () => {
    setStep(Math.max(step - 1, 1));
  };
  const addProductVar = () => {
    dispatch({ action: "addVar" });
  };

  const productOnChange = (e) => {
    dispatch({ action: "product", field: e.target.name, value: e.target.value });
  };
  const productVarOnChange = (index, e) => {
    // console.log(index, e);
    dispatch({
      action: "productVar",
      field: e.target.name,
      value: e.target.value,
      index,
    });
    // console.log(state);
  };
  // console.log(state);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(state, "product");
    createProductAPI(state, token)
      .then((data) => {
        // console.log("returned data: ", data, state);
        dispatch({ action: "reset" });
        setVisible(5);
        setStep(1);
        // window.location.reload(false);
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
  switch (step) {
    case 1:
      return (
        <CreateProductForm
          incrementStep={incrementStep}
          field={omit(state, "variations")}
          productOnChange={productOnChange}
          visible={visible}
          setVisible={setVisible}
        />
      );
    case 2:
      return (
        <CreateProductVarForm
          decrementStep={decrementStep}
          fieldArr={state.variations}
          productVarOnChange={productVarOnChange}
          handleFormSubmit={handleFormSubmit}
          addProductVar={addProductVar}
        />
      );

    default:
      return <h1>error!</h1>;
  }
}

export default CreateProduct;
