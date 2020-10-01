const { createResponse } = require("../responseFormat");
const { getProduct, addProduct, updateProduct, deleteProduct } = require("../database");
const { ResponseCode } = require("../constant");
module.exports.createProduct = (req, res) => {
  try {
    const { masterSku, variations } = req.body;
    const newProduct = {
      masterSku,
      variations,
      remarks: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: res.locals.user.id,
    };
    const product_id = addProduct(newProduct);
    res.status(200).json(createResponse({ product_id }, "Create Product successfully"));
  } catch (err) {
    console.log(err);
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getProduct = (req, res) => {
  const product_id = req.params.id;
  let resultList = getProduct(product_id);
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
      throw 500;
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
