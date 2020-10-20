// import CIcon from "@coreui/icons-react";
import {
  CBadge,
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
  dropdowns,
  editDeleteButtonGroup,
  approvalButtonGroup,
  restoreButtonGroup,
  productStatus,
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
      label: "Operations",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  const getBadge = (status) => {
    switch (status) {
      case null:
        return "secondary";
      case "yes":
        return "success";
      case "no":
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
              resale: ({ resale }) => {
                const stringify = resale === "true" || resale === true ? "yes" : "no";
                return (
                  <td>
                    <CBadge color={getBadge(stringify)}>{stringify}</CBadge>
                  </td>
                );
              },
              operations: (varItem, varIndex) => {
                switch (productStatus) {
                  case "1": //"Active":
                    return (
                      <td className="py-2">{editDeleteButtonGroup(varItem, varIndex)}</td>
                    );
                  case "2": //"Pending":
                    return (
                      <td className="py-2">{approvalButtonGroup(varItem, varIndex)}</td>
                    );
                  case "3": //"Inactive":
                    return (
                      <td className="py-2">{restoreButtonGroup(varItem, varIndex)}</td>
                    );
                  default:
                    break;
                }
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCollapse>
  );
}

export default ProductVarTable;
