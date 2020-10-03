const { createResponse } = require("../responseFormat");
const { getProduct, addProduct, updateProduct, deleteProduct } = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
const { mainCreate } = require("./productVarController");

module.exports.createProduct = (req, res) => {
  try {
    if (!checkParams(["masterSku", "variations"], req.body)) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }
    const { masterSku, variations, remarks } = req.body;
    let productVar_id = [];
    variations.forEach((productVar) => {
      productVar_id.push(mainCreate(productVar));
    });
    if (productVar_id.includes(null)) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, "Some inputs are missing for product variations."));
      return;
    }
    const newProduct = {
      masterSku,
      variations: productVar_id,
      remarks: remarks ? remarks : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: res.locals.user.id,
    };
    const product_id = addProduct(newProduct);
    res.status(200).json(createResponse({ product_id }, "Create Product successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getProduct = (req, res) => {
  const product_id = req.params.id;
  let page = 1;
  if ("page" in req.query) {
    page = req.query.page;
  }
  let resultList = getProduct(product_id, page);
  res
    .status(ResponseCode.General_success.code)
    .json(
      createResponse(
        { resultList: resultList },
        resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
      )
    );
};

module.exports.updateProduct = (req, res) => {
  try {
    const req_body = req.body;
    if (!("product_id" in req_body)) {
      throw new Error("Product id not found");
    }
    if (getProduct(req_body.product_id).length === 0) {
      res.status(400).json(createResponse(null, "Product not found"));
      return;
    }
    updateProduct(req_body);
    res
      .status(200)
      .json(
        createResponse({ product_id: req_body.product_id }, "Update Product successfully")
      );
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.deleteProduct = (req, res) => {
  try {
    const { product_id } = req.body;
    if (getProduct(product_id).length === 0) {
      res.status(400).json(createResponse(null, "Product not found"));
      return;
    }
    deleteProduct(product_id);
    res.status(200).json(createResponse({ product_id }, "Delete Product successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};
