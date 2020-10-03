import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse,
} from "@coreui/react";
// import usersData from "../../users/UsersData";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";
// import { findLastIndex } from "lodash";

const productVarFields = [
  "itemNo",
  "title",
  "retailPrice",
  "supplyPrice",
  "supplier",
  "resale",
  "createdAt",
  {
    key: "operations",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];

const fields = [
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  { key: "masterSku", _style: { width: "40%" } },
  { key: "remarks", _style: { width: "14%" } },
  { key: "createdAt", _style: { width: "20%" } },
  { key: "createdBy", _style: { width: "14%" } },
  {
    key: "operations",
    label: "",
    _style: { width: "11%" },
    sorter: false,
    filter: false,
  },
  // {
  //   key: "edit_product",
  //   label: "",
  //   _style: { width: "1%" },
  //   sorter: false,
  //   filter: false,
  // },
  // {
  //   key: "delete_product",
  //   label: "",
  //   _style: { width: "1%" },
  //   sorter: false,
  //   filter: false,
  // },
];
const getBadge = (status) => {
  switch (status) {
    case null:
      return "secondary";
    case true:
      return "success";
    case false:
      return "danger";
    default:
      return "primary";
  }
};
const Products = () => {
  const token = useSelector((state) => state.userInfo.user.token);
  const [productData, setProductData] = useState([]);

  // useEffect(() => {
  //   getProductAPI(token)
  //     .then(({ data }) => {
  //       setProductData(data.resultList);
  //       // console.log("returned data: ", [data.resultList]);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // console.error("err response", error.response); // client received an error response (5xx, 4xx)
  //       } else if (error.request) {
  //         // console.error("err req", error.request); // client never received a response, or request never left
  //       } else {
  //         // anything else // console.error("There was an error!", error);
  //       }
  //     });
  //   return () => {};
  // }, []);
  const getEntireProductList = async (pageNo = 1) => {
    const { data } = await getProductAPI(token, pageNo);
    const results = data.resultList;
    console.log(results);
    console.log("Retreiving data from API for page : " + pageNo);
    if (results.length > 0) {
      return results.concat(await getEntireProductList(pageNo + 1));
    } else {
      return results;
    }
  };
  useEffect(() => {
    const entireList = async () => {
      const entireList = await getEntireProductList();
      console.log(entireList);
      setProductData(entireList);
    };
    entireList();
    return () => {};
  }, []);

  const [details, setDetails] = useState([]);
  let history = useHistory();
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const handleEditProductVar = (varItem) => {
    console.log(varItem);
    history.push({
      pathname: "/updateProductVarForm",
      // search: "?query=abc",
      state: varItem,
    });
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Products Table</CCardHeader>
            <CCardBody>
              <CDataTable
                items={productData}
                fields={fields}
                // hover
                // striped
                bordered
                itemsPerPage={5}
                pagination
                tableFilter
                columnFilter
                itemsPerPageSelect
                sorter
                onPageChange={(page) => console.log(page)}
                scopedSlots={{
                  remarks: (item) => (
                    <td>
                      <CBadge color={getBadge(item.remarks)}>
                        {item.status == null ? "No remark" : item.status}
                      </CBadge>
                    </td>
                  ),
                  operations: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          className="inline"
                          color="info"
                          variant="ghost"
                          shape="pill"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}>
                          <CIcon name="cil-pencil" />
                        </CButton>
                        <CButton
                          className="inline"
                          color="danger"
                          variant="ghost"
                          shape="pill"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}>
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    );
                  },
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          shape="pill"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}>
                          {details.includes(index) ? (
                            <CIcon name="cil-chevron-bottom" />
                          ) : (
                            <CIcon name="cil-chevron-right" />
                          )}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    // console.log(item);
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCard borderColor="info" className="my-3">
                          <CCardHeader>Product variations</CCardHeader>
                          <CCardBody>
                            {/* <h4>{item.masterSku}</h4>
                          <p className="text-muted">User since: {item.registered}</p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton> */}
                            <CDataTable
                              items={item.variations}
                              fields={productVarFields}
                              hover
                              striped
                              bordered
                              size="sm"
                              itemsPerPage={10}
                              pagination
                              // clickableRows
                              // onRowClick={(varItem, varIndex) => {
                              //   console.log("special", item, index, varItem, varIndex);
                              //   history.push(`/users/${varItem.id}`);
                              // }}
                              scopedSlots={{
                                resale: (varItem) => {
                                  return (
                                    <td>
                                      <CBadge color={getBadge(varItem.resale)}>
                                        {varItem.resale === true ? "true" : "false"}
                                      </CBadge>
                                    </td>
                                  );
                                },
                                operations: (varItem, varindex) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        color="info"
                                        variant="ghost"
                                        shape="pill"
                                        size="sm"
                                        onClick={() => {
                                          handleEditProductVar(varItem);
                                        }}>
                                        <CIcon name="cil-pencil" />
                                      </CButton>
                                      <CButton
                                        color="danger"
                                        variant="ghost"
                                        shape="pill"
                                        size="sm"
                                        onClick={() => {
                                          toggleDetails(varindex);
                                        }}>
                                        <CIcon name="cil-trash" />
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCard>
                      </CCollapse>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Combined All Table</CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={oldfields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};

export default Products;
