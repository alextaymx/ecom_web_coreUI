const { createResponse } = require("../responseFormat");
const {
  getProductVar,
  addProductVar,
  updateProductVar,
  deleteProductVar,
} = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
module.exports.createProductVar = (req, res) => {
  try {
    if (
      !checkParams(
        ["itemNo", "retailPrice", "supplyPrice", "supplyRate", "resale", "image"],
        req.body
      )
    ) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }
    const { itemNo, retailPrice, supplyPrice, supplyRate, resale, image } = req.body;
    const newProductVar = {
      itemNo,
      retailPrice,
      supplyPrice,
      supplyRate,
      resale,
      image,
      title: null,
      chineseTitle: null,
      version: null,
      brand: null,
      numberOfKind: null,
      remarks: null,
      package: null,
      packageSize: null,
      manufacturer: null,
      moq: null,
      ct: null,
      orderType: null,
      orderBy: null,
      releaseBy: null,
      orders: [],
      supplier: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const product_id = addProductVar(newProductVar);
    res
      .status(200)
      .json(createResponse({ product_id }, "Create Product Variation successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getProductVar = (req, res) => {
  const product_id = req.params.id;
  let page = 1;
  if ("page" in req.query) {
    page = req.query.page;
  }
  let resultList = getProductVar(product_id, page);
  res
    .status(ResponseCode.General_success.code)
    .json(
      createResponse(
        { resultList: resultList },
        resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
      )
    );
};

module.exports.updateProductVar = (req, res) => {
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

module.exports.deleteProductVar = (req, res) => {
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
