import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../../views/charts/ChartLineSimple";

// import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = ({ data }) => {
  const dropdown = () => {
    return (
      <CDropdown>
        <CDropdownToggle color="transparent">
          <CIcon name="cil-settings" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem>Action</CDropdownItem>
          <CDropdownItem>Another action</CDropdownItem>
          <CDropdownItem>Something else here...</CDropdownItem>
          <CDropdownItem disabled>Disabled action</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  };
  // render
  return (
    <>
      {data && (
        <CRow>
          <CCol sm="12" lg="4">
            <CWidgetDropdown
              color="gradient-primary"
              header={data.product.labels.reduce((a, b) => a + b, 0).toString()}
              text="Products created"
              footerSlot={
                <ChartLineSimple
                  pointed
                  className="c-chart-wrapper mt-3 mx-3"
                  style={{ height: "70px" }}
                  dataPoints={data.product.labels}
                  pointHoverBackgroundColor="primary"
                  label="Products"
                  labels="days"
                />
              }>
              {dropdown()}
            </CWidgetDropdown>
          </CCol>

          <CCol sm="12" lg="4">
            <CWidgetDropdown
              color="gradient-info"
              header={data.productVar.labels.reduce((a, b) => a + b, 0).toString()}
              text="Product variants created"
              footerSlot={
                <ChartLineSimple
                  pointed
                  className="mt-3 mx-3"
                  style={{ height: "70px" }}
                  dataPoints={data.productVar.labels}
                  pointHoverBackgroundColor="info"
                  options={{ elements: { line: { tension: 0.00001 } } }}
                  label="Variants"
                  labels="days"
                />
              }>
              {dropdown()}
            </CWidgetDropdown>
          </CCol>
          <CCol sm="12" lg="4">
            <CWidgetDropdown
              color="gradient-warning"
              header={data.user.labels.reduce((a, b) => a + b, 0).toString()}
              text="Users registered"
              footerSlot={
                <ChartLineSimple
                  className="mt-3"
                  style={{ height: "70px" }}
                  backgroundColor="rgba(255,255,255,.2)"
                  dataPoints={data.user.labels}
                  pointHoverBackgroundColor="warning"
                  options={{ elements: { line: { borderWidth: 2.5 } } }}
                  label="Users"
                  labels="days"
                />
              }>
              {dropdown()}
            </CWidgetDropdown>
          </CCol>

          {/* <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Members online"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }>
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol> */}
        </CRow>
      )}
    </>
  );
};

export default WidgetsDropdown;
