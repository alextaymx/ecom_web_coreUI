import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CNav,
  CNavLink,
  CPagination,
  CRow,
} from "@coreui/react";

import { getUserAPI } from "../../../apiCalls/get";
import { useDispatch, useSelector } from "react-redux";
import { onLogoutv2 } from "../../../apiCalls/auth";

// import usersData from "../../users/UsersData";
const fields = ["name", "email", "role", "isActivated"];
const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "danger";
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
function UserList() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.user.token);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [tab, setTab] = useState("Pending");
  const status = tab === "Active" ? true : false;
  useEffect(() => {
    setLoading(true);
    getUserAPI(token, "*", currentPage, status)
      .then(({ data }) => {
        setUserData(data.resultList);
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
          <CCardHeader>User List</CCardHeader>
          <CCardBody>
            <CNav variant="tabs" justified>
              <CNavLink
                onClick={() => {
                  setTab("Active");
                  setFetchTrigger(fetchTrigger + 1);
                }}
                active={tab === "Active"}>
                Active
              </CNavLink>
              <CNavLink
                onClick={() => {
                  setTab("Pending");
                  setFetchTrigger(fetchTrigger + 1);
                }}
                active={tab === "Pending"}>
                Pending
              </CNavLink>
            </CNav>
            <CDataTable
              items={userData}
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
                isActivated: (item) => (
                  <td>
                    <CBadge color={getBadge(item.isActivated)}>
                      {item.isActivated ? "Active" : "Not Active"}
                    </CBadge>
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

export default UserList;
