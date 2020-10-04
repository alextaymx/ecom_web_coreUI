import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import productionNavigation from "./_productionNav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeState.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={35} />
        {/* <CIcon className="c-sidebar-brand-full" name="cib-Eventbrite" height={35} />
        <h1 className="c-sidebar-brand-full" height={35}>
          com
        </h1>
        <h2 className="c-sidebar-brand-full" height={35}>
          Web
        </h2> */}
        <CIcon className="c-sidebar-brand-minimized" name="cib-Eventbrite" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={
            process.env.NODE_ENV === "production" ? productionNavigation : navigation
          }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
