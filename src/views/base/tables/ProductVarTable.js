import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import React from "react";

function ProductVarTable({
  item,
  index,
  handleEditProductVar,
  handleDeleteProductVar,
  dropdowns,
  editDeleteButtonGroup,
}) {
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
    <CCollapse show={dropdowns.includes(index)}>
      <CCard borderColor="info" className="m-3">
        <CCardHeader>Product variations</CCardHeader>
        <CCardBody>
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
                return <td>{varItem.supplier ? varItem.supplier.name : ""}</td>;
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
              operations: (varItem, varIndex) => {
                return (
                  <td className="py-2">
                    {editDeleteButtonGroup(varItem, varIndex, true)}
                  </td>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCollapse>
  );
}

export default ProductVarTable;
