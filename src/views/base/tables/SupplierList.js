import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow,
} from "@coreui/react";

import { getSupplierAPI } from "../../../apiCalls/get";
import { useDispatch, useSelector } from "react-redux";
import { onLogoutv2 } from "../../../apiCalls/auth";

const fields = ["name", "address", "email", "telNo", "faxNo"];
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
function SupplierList() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.user.token);
  const [supplierData, setSupplierData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    getSupplierAPI(token, "*", currentPage)
      .then(({ data }) => {
        console.log(data.resultList);
        setSupplierData(data.resultList);
        setTotalPages(data.totalPage || 3);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          onLogoutv2(dispatch);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          setTimeout(() => {
            setFetchTrigger(fetchTrigger + 1);
          }, 2000);
          // anything else // console.error("There was an error!", error);
        }
      });
  }, [token, dispatch, currentPage, fetchTrigger]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Supplier List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={supplierData}
              fields={fields}
              loading={loading}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              sorter
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
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
  );
}

export default SupplierList;
