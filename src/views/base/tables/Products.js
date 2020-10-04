import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";
import { deleteProductAPI, deleteProductVarAPI } from "../../../apiCalls/post";
import produce from "immer";
import { onLogoutv2 } from "../../../apiCalls/auth";
import { pick } from "lodash";
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
    label: "Operations",
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
  const [dropdowns, setDropdowns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getProductAPI(token, currentPage)
      .then(({ data }) => {
        setProductData(data.resultList);
        setTotalPages(data.totalPage);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          onLogoutv2(dispatch);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          // anything else // console.error("There was an error!", error);
        }
        setTimeout(() => {
          setFetchTrigger(fetchTrigger + 1);
        }, 2000);
      });
  }, [dispatch, token, currentPage, fetchTrigger]);

  const toggleDropdown = (index) => {
    const position = dropdowns.indexOf(index);
    let newDetails = dropdowns.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...dropdowns, index];
    }
    setDropdowns(newDetails);
  };
  const handleEditProduct = (item) => {
    // console.log(item);
    const productFields = pick(item, "id", "masterSku", "remarks");
    history.push({
      pathname: "/updateProductForm",
      // search: "?query=abc",
      state: productFields,
    });
  };
  const handleEditProductVar = (varItem) => {
    // console.log(varItem);
    history.push({
      pathname: "/updateProductVarForm",
      // search: "?query=abc",
      state: varItem,
    });
  };
  const handleDeleteProduct = ({ id }, index) => {
    deleteProductAPI({ product_id: id }, token)
      .then((data) => {
        console.log(productData);
        setProductData(
          produce(productData, (draft) => {
            draft.splice(index, 1);
            // delete draft[index];
          })
        );
        // console.log("returned data: ", [data.resultList]);
      })
      .catch((error) => {});
  };
  const handleDeleteProductVar = ({ id }, varIndex, index) => {
    deleteProductVarAPI({ product_id: id }, token)
      .then((data) => {
        // console.log(productData[index].variations[varIndex]);
        setProductData(
          produce(productData, (draft) => {
            draft[index].variations.splice(varIndex, 1);
            // delete draft[index].variations[varIndex];
          })
        );
        // console.log("returned data: ", [data.resultList]);
      })
      .catch((error) => {});
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
                loading={loading}
                hover
                cleaner
                // hover
                // striped
                // outlined
                // border
                responsive
                // pagination
                tableFilter
                columnFilter
                sorter
                // onRowClick={(item, index) => {
                //   toggleDropdown(index);
                // }}
                // onPageChange={(page) => console.log(page)}
                // itemsPerPageSelect
                itemsPerPageSelect={{ external: true }}
                itemsPerPage={itemsPerPage}
                onPaginationChange={setItemsPerPage}
                scopedSlots={{
                  remarks: (item) => (
                    <td>
                      {item.remarks ? item.remarks : "No remark"}
                      {/* <CBadge color={getBadge(item.remarks)}>
                        {item.remarks == null ? "No remark" : item.remarks}
                      </CBadge> */}
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
                            handleEditProduct(item, index);
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
                            handleDeleteProduct(item, index);
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
                            toggleDropdown(index);
                          }}>
                          {dropdowns.includes(index) ? (
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
                      <CCollapse show={dropdowns.includes(index)}>
                        <CCard borderColor="info" className="m-3">
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
                              // hover
                              // striped
                              // outlined
                              sorter
                              border
                              size="sm"
                              itemsPerPage={5}
                              // addTableClasses="table-light"
                              pagination
                              // clickableRows
                              // onRowClick={(varItem, varIndex) => {
                              //   console.log("special", item, index, varItem, varIndex);
                              //   history.push(`/users/${varItem.id}`);
                              // }}
                              scopedSlots={{
                                supplier: (varItem) => {
                                  return <td>{varItem.supplier.name}</td>;
                                },
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
                                          handleDeleteProductVar(
                                            varItem,
                                            varindex,
                                            index
                                          );
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
              <CPagination
                pages={totalPages}
                activePage={currentPage}
                onActivePageChange={setCurrentPage}
                // arrows={totalPages < 5 && false}
                // doubleArrows={totalPages < 5 && false}
                className={totalPages < 2 ? "d-none" : ""}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Products;
