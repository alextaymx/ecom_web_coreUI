const { createResponse } = require("../responseFormat");
const {
  getProductVar,
  addProductVar,
  updateProductVar,
  deleteProductVar,
} = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
const _ = require("lodash");
const { processProductVar } = require("../utils/dbProcessData");

const mainCreate = (obj) => {
  if (
    !checkParams(
      [
        "itemNo",
        "retailPrice",
        "supplyPrice",
        "supplyRate",
        "resale",
        "image",
        "orderType",
        "orders",
      ],
      obj
    )
  ) {
    return null;
  }
  const {
    itemNo,
    retailPrice,
    supplyPrice,
    supplyRate,
    resale,
    image,
    title,
    chineseTitle,
    version,
    brand,
    numberOfKind,
    remarks,
    packages,
    packageSize,
    manufacturer,
    moq,
    ct,
    orderType,
    orderBy,
    releaseBy,
    orders,
    supplier,
  } = obj;
  const newProductVar = {
    itemNo,
    retailPrice,
    supplyPrice,
    supplyRate,
    resale,
    image,
    title: title ? title : null,
    chineseTitle: chineseTitle ? chineseTitle : null,
    version: version ? version : null,
    brand: brand ? brand : null,
    numberOfKind: numberOfKind ? numberOfKind : null,
    remarks: remarks ? remarks : null,
    package: packages ? packages : null,
    packageSize: packageSize ? packageSize : null,
    manufacturer: manufacturer ? manufacturer : null,
    moq: moq ? moq : null,
    ct: ct ? ct : null,
    orderType: orderType ? orderType : null,
    orderBy: orderBy ? orderBy : null,
    releaseBy: releaseBy ? releaseBy : null,
    orders: orders,
    supplier: supplier ? supplier : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const product_id = addProductVar(newProductVar);
  return product_id;
};

const createProductVar = (req, res) => {
  try {
    const product_id = mainCreate(req.body);
    if (product_id == null) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }
    res
      .status(200)
      .json(createResponse({ product_id }, "Create Product Variation successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

const getProductVars = (req, res) => {
  const product_id = req.params.id;
  let page = 1;
  if ("page" in req.query) {
    page = req.query.page;
  }
  let resultList = _.cloneDeep(getProductVar(product_id, page));
  resultList.forEach((productVar, index) => {
    resultList[index] = processProductVar(productVar);
  });
  res
    .status(ResponseCode.General_success.code)
    .json(
      createResponse(
        { resultList: resultList },
        resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
      )
    );
};

const updateProductVars = (req, res) => {
  try {
    const req_body = req.body;
    if (!("product_id" in req_body)) {
      throw 500;
    }
    if (getProductVar(req_body.product_id).length === 0) {
      res.status(400).json(createResponse(null, "Product Variation not found"));
      return;
    }
    updateProductVar(req_body);
    res
      .status(200)
      .json(
        createResponse(
          { product_id: req_body.product_id },
          "Update Product Variation successfully"
        )
      );
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

const deleteProductVars = (req, res) => {
  try {
    const { product_id } = req.body;
    if (getProductVar(product_id).length === 0) {
      res.status(400).json(createResponse(null, "Product Variation not found"));
      return;
    }
    deleteProductVar(product_id);
    res
      .status(200)
      .json(createResponse({ product_id }, "Delete Product Variation successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports = {
  getProductVars,
  createProductVar,
  mainCreate,
  updateProductVars,
  deleteProductVars,
};
