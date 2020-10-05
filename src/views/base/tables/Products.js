import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CDataTable,
  CPagination,
  CButton,
  CButtonGroup,
} from "@coreui/react";
// import usersData from "../../users/UsersData";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";
import { deleteProductAPI, deleteProductVarAPI } from "../../../apiCalls/post";
import { onLogoutv2 } from "../../../apiCalls/auth";
import { pick } from "lodash";
import ProductVarTable from "./ProductVarTable";
// import { findLastIndex } from "lodash";

const fields = [
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  { key: "masterSku", _style: { width: "40%" } },
  { key: "remarks", _style: { width: "14%" } },
  { key: "createdAt", _style: { width: "20%" } },
  { key: "createdBy", _style: { width: "14%" } },
  {
    key: "operations",
    label: "Operations",
    _style: { width: "11%" },
    sorter: false,
    filter: false,
  },
];
const Products = ({ productType }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.user.token);
  const history = useHistory();

  const [productData, setProductData] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProductAPI(token, productType == "Pending" ? currentPage + 1 : currentPage)
      .then(({ data }) => {
        setProductData(data.resultList);
        setTotalPages(data.totalPage);
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
  }, [productType, dispatch, token, currentPage, fetchTrigger]);

  const toggleDropdown = (index) => {
    const position = dropdowns.indexOf(index);
    let newDetails = dropdowns.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...dropdowns, index];
    }
    setDropdowns(newDetails);
  };
  const handleEditProduct = (item) => {
    // console.log(item);
    const productFields = pick(item, "id", "masterSku", "remarks");
    history.push({
      pathname: "/updateProductForm",
      state: productFields,
    });
  };
  const handleEditProductVar = (varItem) => {
    // console.log(varItem);
    history.push({
      pathname: "/updateProductVarForm",
      state: varItem,
    });
  };
  const handleDeleteProduct = ({ id }) => {
    deleteProductAPI({ product_id: id }, token)
      .then((data) => {
        console.log(productData);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
  };
  const handleDeleteProductVar = ({ id }) => {
    deleteProductVarAPI({ product_id: id }, token)
      .then((data) => {
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
  };
  const editDeleteButtonGroup = (item, index, productVar = false) => (
    <>
      <CButton
        className="inline"
        color="info"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          productVar ? handleEditProductVar(item, index) : handleEditProduct(item, index);
        }}>
        <CIcon name="cil-pencil" />
      </CButton>
      <CButton
        className="inline"
        color="danger"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          productVar
            ? handleDeleteProductVar(item, index)
            : handleDeleteProduct(item, index);
        }}>
        <CIcon name="cil-trash" />
      </CButton>
    </>
  );

  const scopedSlots = {
    remarks: (item) => <td>{item.remarks ? item.remarks : "-"}</td>,
    operations: (item, index) => {
      return <td className="py-2">{editDeleteButtonGroup(item, index)}</td>;
    },
    show_details: (item, index) => {
      return (
        <td className="py-2">
          <CButton
            shape="pill"
            size="sm"
            onClick={() => {
              toggleDropdown(index);
            }}>
            {dropdowns.includes(index) ? (
              <CIcon name="cil-chevron-bottom" />
            ) : (
              <CIcon name="cil-chevron-right" />
            )}
          </CButton>
        </td>
      );
    },
    details: (item, index) => {
      return (
        <ProductVarTable
          item={item}
          index={index}
          handleEditProductVar={handleEditProductVar}
          handleDeleteProductVar={handleDeleteProductVar}
          dropdowns={dropdowns}
          editDeleteButtonGroup={editDeleteButtonGroup}
        />
      );
    },
  };
  return (
    <>
      <CCard accentColor="primary">
        <CCardBody>
          <CDataTable
            items={productData}
            fields={fields}
            loading={loading}
            hover
            cleaner
            // hover
            // striped
            // outlined
            // border
            // pagination
            responsive
            tableFilter
            columnFilter
            sorter
            // onRowClick={(item, index) => {
            //   toggleDropdown(index);
            // }}
            // onPageChange={(page) => console.log(page)}
            // itemsPerPageSelect
            itemsPerPageSelect={{ external: true }}
            itemsPerPage={itemsPerPage}
            onPaginationChange={setItemsPerPage}
            scopedSlots={scopedSlots}
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
    </>
  );
};

export default Products;
