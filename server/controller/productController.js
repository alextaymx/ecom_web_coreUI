const { createResponse } = require("../responseFormat");
const { productVarList } = require("../database");
const { ResponseCode } = require("../constant");
module.exports.createProduct = (req, res) => {
  res.status(200).json(createResponse({ product_id: 1 }, "Create Product successfully"));
};

module.exports.getProduct = (req, res) => {
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
