import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  // CTabContent,
  // CTabPane,
  // CTabs,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Products from "./Products";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkPermission, PERMISSION } from "../../../apiCalls/constant";

function TableTabs() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const currentPermission = useSelector((state) => state.userInfo.user.permission);
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Products Table
              <div className="card-header-actions">
                <CButton
                  className="inline"
                  color={
                    checkPermission(currentPermission, PERMISSION.Create_Product)
                      ? "info"
                      : "secondary"
                  }
                  variant="outline"
                  shape="pill"
                  // size="sm"
                  disabled={
                    !checkPermission(currentPermission, PERMISSION.Create_Product)
                  }
                  onClick={() => {
                    history.push({
                      pathname: "/createProduct",
                    });
                  }}>
                  <CIcon name="cil-plus" className="mr-2 float-left" />
                  Create product
                </CButton>
              </div>
              {/* <div className="card-header-actions m-0 p-0">
                <CDropdown>
                  <CDropdownToggle size="sm">Small button</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem header>Header</CDropdownItem>
                    <CDropdownItem disabled>Action Disabled</CDropdownItem>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem>Another Action</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div> */}
            </CCardHeader>
            <CCardBody>
              <CNav variant="pills" fill justified>
                <CNavItem>
                  <CNavLink
                    onClick={() => {
                      setActiveTab(1);
                      // setFetchTrigger(fetchTrigger + 1);
                    }}
                    active={activeTab === 1}>
                    <CIcon name="cil-check-circle" />
                    {activeTab === 1 && " Active"}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    onClick={() => {
                      setActiveTab(2);
                      // setFetchTrigger(fetchTrigger + 1);
                    }}
                    active={activeTab === 2}>
                    <CIcon name="cil-clock" />
                    {activeTab === 2 && " Pending"}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    onClick={() => {
                      setActiveTab(3);
                      // setFetchTrigger(fetchTrigger + 1);
                    }}
                    active={activeTab === 3}>
                    <CIcon name="cil-history" />
                    {activeTab === 3 && " Archived"}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <Products productStatus={activeTab.toString()} />

              {/* <CTabs activeTab={activeTab} onActiveTabChange={(idx) => setActiveTab(idx)}>
                <CNav variant="tabs" fill justified>
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-check-circle" />
                      {activeTab === 0 && " Approved"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-clock" />
                      {activeTab === 1 && " Pending"}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-history" />
                      {activeTab === 2 && " Archived"}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent fade={false}>
                  <CTabPane>
                    <Products productStatus="1" />
                  </CTabPane>
                  <CTabPane>
                    <Products productStatus="2" />
                  </CTabPane>
                  <CTabPane>
                    <Products productStatus="3" />
                  </CTabPane>
                </CTabContent>
              </CTabs> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default TableTabs;
