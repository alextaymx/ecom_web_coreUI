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
                switch (productStatus) {
                  case "Active":
                    return <td className="py-2">{editDeleteButtonGroup(item, index)}</td>;
                  case "Pending":
                    return <td className="py-2">{approvalButtonGroup(item, index)}</td>;
                  case "Inactive":
                    return <td className="py-2">{restoreButtonGroup(item, index)}</td>;
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
