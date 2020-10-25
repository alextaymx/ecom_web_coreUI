import React from "react";
import {
  // CAlert,
  // CButton,
  // CCard,
  // CCardBody,
  // CCardHeader,
  CCol,
  // CForm,
  CFormGroup,
  CInput,
  // CInputGroup,
  // CInputGroupAppend,
  // CInputGroupPrepend,
  // CInputGroupText,
  // CInputRadio,
  CLabel,
  // CRow,
} from "@coreui/react";
import { AsyncPaginate } from "react-select-async-paginate";
import { getProductAPI } from "../../apiCalls/get";
import { startCase } from "lodash";

function ProductOptions({ token, product, setProduct, orderOnChange }) {
  const loadOptions = async (search, oldProduct, { page }) => {
    try {
      const params = {
        status: 1,
        page,
        ...(search && { searchKey: search }),
      };
      const query = new URLSearchParams(params).toString();
      console.log("Fetching product options");
      const {
        data: { resultList, totalPage },
      } = await getProductAPI(token, "*", query);
      console.log(resultList);
      const options = resultList.map((item) => {
        const varOptions = item.variations.map((varItem) => {
          return {
            value: {
              productVarID: varItem.id,
              itemNo: varItem.itemNo,
              title: varItem.title,
              ...(varItem.supplier && {
                supplier: `${varItem.supplier.name} [${varItem.supplier.id}]`,
              }),
            },
            label: `${varItem.itemNo} ${varItem.title}`,
          };
        });
        return {
          label: item.masterSku,
          options: varOptions,
        };
      });
      const hasMore = resultList.length !== 0 && page !== totalPage;
      return {
        options,
        hasMore,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      // if (error.response) {
      //   onLogoutv2(dispatch);
      //   // console.error("err response", error.response); // client received an error response (5xx, 4xx)
      // }
      return { options: [] };
    }
  };
  return (
    <>
      <CCol sm="6">
        <CFormGroup>
          <CLabel htmlFor="product">Choose Product</CLabel>
          <AsyncPaginate
            name="product"
            id="product"
            loadOptions={loadOptions}
            // defaultValue={
            //   location.state.supplier && {
            //     value: state.supplier,
            //     label: `${location.state.supplier.name} [${state.supplier}]`,
            //   }
            // }
            onChange={({ value }) => {
              setProduct(value);
              orderOnChange({
                target: {
                  name: "product",
                  value: value.productVarID,
                },
              });
            }}
            additional={{
              page: 1,
            }}
          />
        </CFormGroup>
      </CCol>
      {Object.keys(product).map((key, index) => {
        // console.log(key, field[key], index, typeof key);
        const displayName = startCase(key);
        return (
          <CCol sm="6" key={index}>
            <CFormGroup>
              <CLabel htmlFor={key}>{displayName}</CLabel>
              <CInput
                disabled
                type="text"
                id={key}
                name={key}
                // autoComplete="on"
                placeholder={`Enter ${displayName}`}
                value={product[key]}
                onChange={orderOnChange}
                required
              />
            </CFormGroup>
          </CCol>
        );
      })}
    </>
  );
}

export default ProductOptions;
