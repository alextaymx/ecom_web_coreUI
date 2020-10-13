import React, { useEffect, useState } from "react";
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
import ChartLineSimple from "../charts/ChartLineSimple";
import { getStatistics } from "../../apiCalls/post";
import { useSelector } from "react-redux";
// import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = () => {
  const token = useSelector((state) => state.userInfo.user.token);
  const [data, setData] = useState();

  useEffect(() => {
    const payload = { days: 7, target: ["product", "productVar", "user"] };
    getStatistics(payload, token)
      .then(({ data }) => {
        const [{ product }, { productVar }, { user }] = data.resultList;
        const fetchedData = {
          product,
          productVar,
          user,
        };
        setData(fetchedData);
        console.log("returned data: ", fetchedData);
        console.log("returned data: ", product.values);
      })
      .catch((error) => {
        throw error;
      });
  }, [token]);

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
          <CCol sm="6" lg="4">
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
                  labels="months"
                />
              }>
              {dropdown()}
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="4">
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
                  label="Members"
                  labels="months"
                />
              }>
              {dropdown()}
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="4">
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
                  options={{ elements: { line: { borderWidth: 2.5 } } }}
                  pointHoverBackgroundColor="warning"
                  label="Members"
                  labels="months"
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
