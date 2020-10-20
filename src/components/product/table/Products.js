import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CDataTable,
  CPagination,
  CButton,
  // CButtonGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAPI } from "../../../apiCalls/get";
import {
  // deleteProductAPI,
  // deleteProductVarAPI,
  updateProductVarAPI,
} from "../../../apiCalls/post";
import { onLogoutv2 } from "../../../apiCalls/auth";
// import { pick } from "lodash";
import ProductVarTable from "./ProductVarTable";
import { debounce } from "lodash";
import { checkPermission, PERMISSION } from "../../../apiCalls/constant";

const fields = [
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  { key: "masterSku" },
  { key: "remarks", sorter: false },
  { key: "createdBy", _style: { width: "10%" } },
  { key: "createdAt", _style: { width: "10%" } },
  // {
  //   key: "operations",
  //   label: "Operations",
  //   _style: { width: "11%" },
  //   sorter: false,
  //   filter: false,
  // },
];
const Products = ({ productStatus }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.user.token);
  const currentPermission = useSelector((state) => state.userInfo.user.permission);
  const history = useHistory();

  const [productData, setProductData] = useState([]);
  const [dropdowns, setDropdowns] = useState([]); //dropdown contains product var table
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  //table filters & options
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableFilterValue, setTableFilterValue] = useState("");
  const [sorterValue, setSorterValue] = useState({ column: "createdAt", asc: false });

  const params = {
    status: productStatus,
    page: currentPage,
    ...(tableFilterValue && { searchKey: tableFilterValue }),
    ...(sorterValue.column && {
      sortBy: sorterValue.column,
      order: sorterValue.asc === true ? "asc" : "desc",
    }),
    itemsPerPage,
  };
  const query = new URLSearchParams(params).toString();
  useEffect(() => {
    setLoading(true);
    const interval = setTimeout(() => {
      setFetchTrigger(fetchTrigger + 1);
    }, 5000);
    console.log("Now fetching product...", query);
    getProductAPI(token, "*", query)
      .then(({ data }) => {
        setProductData(data.resultList);
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
    return () => {
      clearTimeout(interval);
    };
  }, [dispatch, token, query, fetchTrigger]);

  const debouncedSearch = debounce((query) => {
    setTableFilterValue(query);
  }, 500);

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

  // const handleEditProduct = (item) => {
  //   // console.log(item);
  //   const productFields = pick(item, "id", "masterSku", "remarks");
  //   history.push({
  //     pathname: "/updateProductForm",
  //     state: productFields,
  //   });
  // };
  const handleEditProductVar = (varItem) => {
    // console.log(varItem);
    history.push({
      pathname: "/updateProductVarForm",
      state: varItem,
    });
  };
  // const handleDeleteProduct = ({ id }) => {
  //   deleteProductAPI({ product_id: id }, token)
  //     .then((data) => {
  //       console.log(productData);
  //       setFetchTrigger(fetchTrigger + 1);
  //     })
  //     .catch((error) => {});
  // };
  const handleDeleteProductVar = ({ id }) => {
    const updatePayload = {
      product_id: id,
      status: 3,
    };
    updateProductVarAPI(updatePayload, token)
      .then((data) => {
        console.log(data);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
    // deleteProductVarAPI({ product_id: id }, token)
    //   .then((data) => {
    //     setFetchTrigger(fetchTrigger + 1);
    //   })
    //   .catch((error) => {});
  };
  const handleApproveProductVar = ({ id }) => {
    const updatePayload = {
      product_id: id,
      status: 1,
    };
    updateProductVarAPI(updatePayload, token)
      .then((data) => {
        console.log(data);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
  };

  const editDeleteButtonGroup = (item, index) => (
    <>
      <CButton
        className="inline"
        color={
          checkPermission(currentPermission, PERMISSION.Update_Product)
            ? "info"
            : "secondary"
        }
        variant="ghost"
        shape="pill"
        size="sm"
        disabled={!checkPermission(currentPermission, PERMISSION.Update_Product)}
        onClick={() => {
          handleEditProductVar(item, index);
        }}>
        <CIcon name="cil-pencil" />
      </CButton>
      <CButton
        className="inline"
        color={
          checkPermission(currentPermission, PERMISSION.Delete_Product)
            ? "danger"
            : "secondary"
        }
        variant="ghost"
        shape="pill"
        size="sm"
        disabled={!checkPermission(currentPermission, PERMISSION.Delete_Product)}
        onClick={() => {
          handleDeleteProductVar(item, index);
        }}>
        <CIcon name="cil-trash" />
      </CButton>
    </>
  );

  const approvalButtonGroup = (item, index) => (
    <>
      {editDeleteButtonGroup(item, index)}
      <CButton
        className="inline"
        color="success"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          handleApproveProductVar(item, index);
        }}>
        <CIcon name="cil-check" />
      </CButton>
    </>
  );
  const restoreButtonGroup = (item, index) => (
    <>
      <CButton
        className="inline"
        color="success"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          handleApproveProductVar(item, index);
        }}>
        <CIcon name="cil-history" />
      </CButton>
    </>
  );
  const scopedSlots = {
    remarks: (item) => <td>{item.remarks ? item.remarks : "-"}</td>,
    // operations: (item, index) => {
    //   switch (productStatus) {
    //     case "Active":
    //       return <td className="py-2">{editDeleteButtonGroup(item, index)}</td>;
    //     case "Pending":
    //       return <td className="py-2">{approvalButtonGroup(item, index)}</td>;
    //     case "Inactive":
    //       return <td className="py-2">{approvalButtonGroup(item, index)}</td>;
    //     default:
    //       break;
    //   }
    // },
    createdAt: (item) => {
      console.log(item.createdAt.substring(0, 10));
      return (
        <td className="py-2">
          {`${item.createdAt.match(/\d\d:\d\d/)} ${item.createdAt.substring(0, 10)}`}
        </td>
      );
    },
    show_details: (item, index) => {
      return (
        <td className="py-2">
          <CButton
            color="info"
            variant="ghost"
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
          approvalButtonGroup={approvalButtonGroup}
          restoreButtonGroup={restoreButtonGroup}
          productStatus={productStatus}
        />
      );
    },
  };

  return (
    <>
      <CCard accentColor="primary" className="shadow">
        <CCardBody>
          <CDataTable
            items={productData}
            fields={fields}
            loading={loading}
            hover
            cleaner
            // hover
            // striped
            outlined
            // border
            // pagination
            responsive
            // columnFilter
            sorter
            sorterValue={sorterValue}
            onSorterValueChange={setSorterValue}
            tableFilter={{ external: true }}
            // tableFilterValue={tableFilterValue}
            onTableFilterChange={(query) => {
              debouncedSearch(query);
            }}
            // onRowClick={(item, index) => {
            //   toggleDropdown(index);
            // }}
            // onPageChange={(page) => console.log(page)}
            // itemsPerPageSelect
            itemsPerPageSelect={{ external: true, values: [10, 20, 50, 100] }}
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
