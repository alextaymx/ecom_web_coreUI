import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import usersData from "../../users/UsersData";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";
import { findLastIndex } from "lodash";

const productVarData = [
  {
    id: 1,
    itemNo: 93443,
    title: "Unbranded Steel Bacon",
    chineseTitle: "Fantastic Cotton Chicken",
    image: "http://placeimg.com/640/480/animals",
    version: "v1.2.5",
    brand: "Bugatti",
    numberOfKind: 55412,
    remarks:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    package: null,
    packageSize: null,
    manufacturer: "Dooley LLC",
    moq: null,
    ct: null,
    retailPrice: "709.00",
    supplyPrice: "379.00",
    supplyRate: 0,
    orderType: 1,
    orderBy: "2020-01-03T03:16:28.533Z",
    releaseBy: "2021-08-06T15:30:00.032Z",
    resale: false,
    createdAt: "2020-06-24T23:55:37.610Z",
    updatedAt: "2020-07-27T22:18:10.586Z",
    orders: [5, 3],
    supplier: null,
  },
  {
    id: 2,
    itemNo: 69197,
    title: "Refined Metal Ball",
    chineseTitle: "Fantastic Concrete Towels",
    image: "http://placeimg.com/640/480/animals",
    version: "v1.2.5",
    brand: "Land Rover",
    numberOfKind: 54195,
    remarks:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    package: null,
    packageSize: null,
    manufacturer: "Dicki - Murazik",
    moq: null,
    ct: null,
    retailPrice: "184.00",
    supplyPrice: "958.00",
    supplyRate: 0,
    orderType: 1,
    orderBy: "2020-06-27T02:05:54.808Z",
    releaseBy: "2021-08-25T15:22:00.790Z",
    resale: true,
    createdAt: "2020-05-21T04:48:44.935Z",
    updatedAt: "2019-11-16T16:52:52.050Z",
    orders: [0, 8, 15],
    supplier: null,
  },
];

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
const Products = () => {
  const token = useSelector((state) => state.userInfo.user.token);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductAPI(token)
      .then(({ data }) => {
        setProductData(data.resultList);
        console.log("returned data: ", data.resultList);
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
    return () => {};
  }, []);

  const [details, setDetails] = useState([]);
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
                  // delete_product: (item, index) => {
                  //   return (
                  //     <td className="py-2">
                  //       <CButton
                  //         color="danger"
                  //         variant="ghost"
                  //         shape="pill"
                  //         size="sm"
                  //         onClick={() => {
                  //           toggleDetails(index);
                  //         }}>
                  //         <CIcon name="cil-trash" />
                  //       </CButton>
                  //     </td>
                  //   );
                  // },
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
                        <CCardBody>
                          <h6>Product variations</h6>
                          {/* <h4>{item.masterSku}</h4>
                          <p className="text-muted">User since: {item.registered}</p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton> */}
                          <CDataTable
                            items={productVarData}
                            fields={productVarFields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            scopedSlots={{
                              resale: (item) => {
                                return (
                                  <td>
                                    <CBadge color={getBadge(item.resale)}>
                                      {item.resale == true ? "true" : "false"}
                                    </CBadge>
                                  </td>
                                );
                              },
                              operations: (item, index) => {
                                return (
                                  <td className="py-2">
                                    <CButton
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
                              // delete_product: (item, index) => {
                              //   return (
                              //     <td className="py-2">
                              //       <CButton
                              //         color="danger"
                              //         variant="ghost"
                              //         shape="pill"
                              //         size="sm"
                              //         onClick={() => {
                              //           toggleDetails(index);
                              //         }}>
                              //         <CIcon name="cil-trash" />
                              //       </CButton>
                              //     </td>
                              //   );
                              // },
                            }}
                          />
                        </CCardBody>
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
