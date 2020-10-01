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

const initialState = {
  masterSKU: "",
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

const reducer = (state, { field, value }) => {
  if (field === "reset") {
    return initialState;
  }
  return {
    ...state,
    [field]: value,
  };
};

function CreateProduct() {
  const token = useSelector((state) => state.userInfo.user.token);
  const [state, dispatch] = useReducer(reducer, initialState);
  // const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = state;
  const [step, setStep] = useState(1);
  const incrementStep = () => {
    setStep(Math.min(step + 1, 2));
  };
  const decrementStep = () => {
    setStep(Math.max(step - 1, 1));
  };

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    createProductVarAPI(state, token)
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
  switch (step) {
    case 1:
      return (
        <CreateProductForm
          incrementStep={incrementStep}
          field={pick(state, "masterSKU", "remarks")}
          onChange={onChange}
        />
      );
    case 2:
      return (
        <CreateProductVarForm
          decrementStep={decrementStep}
          field={omit(state, "masterSKU", "remarks")}
          onChange={onChange}
          handleFormSubmit={handleFormSubmit}
        />
      );

    default:
      return <h1>error!</h1>;
  }
}

export default CreateProduct;
