const { createResponse } = require("../responseFormat");
const { productVarList, addProduct } = require("../database");
const { ResponseCode } = require("../constant");
module.exports.createProductVar = (req, res) => {
  try {
    const { itemNo, retailPrice, supplyPrice, supplyRate, resale } = req.body;
    const newProductVar = {
      itemNo,
      retailPrice,
      supplyPrice,
      supplyRate,
      resale,
    };
    const product_id = addProduct(newProductVar);
    res.status(200).json(createResponse({ product_id }, "Create Product successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getProductVar = (req, res) => {
  const product_id = req.params.id;
  let resultList = [];
  if (product_id === "*") {
    resultList = productVarList;
  } else {
    resultList = productVarList.filter(
      (productVar) => productVar.id === parseInt(product_id)
    );
  }
  res
    .status(ResponseCode.General_success.code)
    .json(
      createResponse(
        { resultList: resultList },
        resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
      )
    );
};
