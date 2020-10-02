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
import React, { useReducer, useState } from "react";
import { createProductVarAPI } from "../../../apiCalls/post";
import { useSelector } from "react-redux";
import CreateProductVarForm from "./CreateProductVarForm";
import CreateProductForm from "./CreateProductForm";
import { pick, omit } from "lodash";
import { produce } from "immer";

const initialState = {
  itemNo: "",
  title: "",
  chineseTitle: "",
  version: "",
  brand: "",
  numberOfKind: "",
  remarks: "",
  package: "",
  packageSize: "",
  manufacturer: "",
  moq: "",
  ct: "",
  orderBy: "",
  releaseBy: "",
  order: "",
  supplier: "",
  retailPrice: "",
  supplyPrice: "",
  supplyRate: "",
  resale: "false",
};
const initialProductState = {
  masterSKU: "",
  remarks: "",
  productVar: [initialState],
};

const reducer = (state, { action, field, value, index }) => {
  switch (action) {
    case "reset":
      return initialProductState;
    case "addVar":
      return {
        ...state,
        productVar: [...state.productVar, initialState],
      };
    case "product":
      return {
        ...state,
        [field]: value,
      };
    case "productVar":
      return {
        ...state,
        productVar: produce(state.productVar, (draft) => {
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
  const incrementStep = () => {
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
    dispatch({
      action: "productVar",
      field: e.target.name,
      value: e.target.value,
      index,
    });
  };
  // console.log(state);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    createProductVarAPI(state, token)
      .then((data) => {
        console.log("returned data: ", data, state);
        dispatch({ action: "reset" });
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
          field={pick(state, "masterSKU", "remarks")}
          productOnChange={productOnChange}
        />
      );
    case 2:
      return (
        <CreateProductVarForm
          decrementStep={decrementStep}
          fieldArr={state.productVar}
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
