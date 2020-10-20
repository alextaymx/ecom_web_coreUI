import React, { useEffect, useState } from "react";
import {
  CBadge,
  CButton,
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

import { getUserAPI } from "../../apiCalls/get";
import { useDispatch, useSelector } from "react-redux";
import { onLogoutv2 } from "../../apiCalls/auth";
import CIcon from "@coreui/icons-react";
import { updateUserAPI } from "../../apiCalls/post";
import { useHistory } from "react-router-dom";
import { checkPermission, PERMISSION } from "../../apiCalls/constant";
import { startCase } from "lodash";

// import usersData from "../../users/UsersData";
const fields = [
  "name",
  "email",
  "role",
  "permissions",
  {
    key: "operations",
    label: "Operations",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
];
const getBadge = (status) => {
  switch (status) {
    case true:
      return "success";
    case false:
      return "danger";
    case "SuperAdmin":
      return "danger";
    case "Admin":
      return "primary";
    case "User":
      return "dark";
    // case "Banned":
    //   return "danger";
    default:
      return "light";
  }
};
const status = { Active: 1, Pending: 2, Inactive: 3 };
const permissionLabel = Object.keys(PERMISSION);
function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.userInfo.user.token);
  const currentPermission = useSelector((state) => state.userInfo.user.permission);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [tab, setTab] = useState("Pending");
  useEffect(() => {
    setLoading(true);
    getUserAPI(token, "*", currentPage, status[tab])
      .then(({ data }) => {
        setUserData(data.resultList);
        setTotalPages(Math.max(data.totalPage, 1));
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
  }, [token, dispatch, tab, currentPage, fetchTrigger]);

  const handleEditUser = (item) => {
    // console.log(item);
    history.push({
      pathname: "/updateUser",
      state: item,
    });
  };
  const handleApproveDeleteRestoreUser = ({ id }, action) => {
    let status = 3;
    switch (action) {
      case "approve":
        status = 1;
        break;
      case "delete":
        status = 2;
        break;
      case "restore":
        status = 1;
        break;
      default:
        break;
    }
    const updatePayload = {
      id,
      status,
    };
    updateUserAPI(updatePayload, token)
      .then((data) => {
        // console.log(data);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
  };
  const editApprovalButtonGroup = (item) => (
    <>
      {tab === "Inactive" && (
        <CButton
          className="inline"
          color="success"
          variant="ghost"
          shape="pill"
          size="sm"
          onClick={() => {
            handleApproveDeleteRestoreUser(item, "restore");
          }}>
          <CIcon name="cil-history" />
        </CButton>
      )}
      {tab !== "Inactive" && (
        <>
          <CButton
            className="inline"
            variant="ghost"
            shape="pill"
            size="sm"
            color={
              checkPermission(currentPermission, PERMISSION.Update_User)
                ? "info"
                : "secondary"
            }
            disabled={!checkPermission(currentPermission, PERMISSION.Update_User)}
            onClick={() => {
              handleEditUser(item);
            }}>
            <CIcon name="cil-pencil" />
          </CButton>
          <CButton
            className="inline"
            variant="ghost"
            shape="pill"
            size="sm"
            color={
              checkPermission(currentPermission, PERMISSION.Delete_User)
                ? "danger"
                : "secondary"
            }
            disabled={!checkPermission(currentPermission, PERMISSION.Delete_User)}
            onClick={() => {
              handleApproveDeleteRestoreUser(item, "delete");
            }}>
            <CIcon name="cil-ban" />
          </CButton>
        </>
      )}
      {tab === "Pending" && (
        <CButton
          className="inline"
          color="success"
          variant="ghost"
          shape="pill"
          size="sm"
          onClick={() => {
            handleApproveDeleteRestoreUser(item, "approve");
          }}>
          <CIcon name="cil-check" />
        </CButton>
      )}
    </>
  );
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            User List
            <div className="card-header-actions">
              <CButton
                className="inline"
                color={
                  checkPermission(currentPermission, PERMISSION.Create_User)
                    ? "info"
                    : "secondary"
                }
                variant="outline"
                shape="pill"
                disabled={!checkPermission(currentPermission, PERMISSION.Create_User)}
                // size="sm"
                onClick={() => {
                  history.push({
                    pathname: "/createUser",
                  });
                }}>
                <CIcon name="cil-plus" className="mr-2 float-left" />
                Create User
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" justified>
              <CNavLink
                onClick={() => {
                  setTab("Active");
                }}
                active={tab === "Active"}>
                Active
              </CNavLink>
              <CNavLink
                onClick={() => {
                  setTab("Inactive");
                }}
                active={tab === "Inactive"}>
                Inactive
              </CNavLink>
              <CNavLink
                onClick={() => {
                  setTab("Pending");
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
                role: (item) => (
                  <td>
                    <CBadge color={getBadge(item.role)}>{startCase(item.role)}</CBadge>
                  </td>
                ),
                permissions: (item) => (
                  <td>
                    {item.permissions.map((key) => {
                      return (
                        <CBadge color={getBadge(item.permissions)} key={key}>
                          {startCase(permissionLabel[key - 1])}
                        </CBadge>
                      );
                    })}
                  </td>
                ),
                operations: (item, index) => (
                  <td className="py-2">{editApprovalButtonGroup(item, index)}</td>
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
