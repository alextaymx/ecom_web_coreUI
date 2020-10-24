const { createResponse } = require("../responseFormat");
const constant = require("../constant");

module.exports.getConstant = (req, res) => {
  try {
    const item = req.params.item;
    let resultList = [];
    switch (item) {
      case "country":
        resultList = constant.CountryList;
        break;
      case "permission":
        resultList = constant.Permissions;
        break;
      case "orderType":
        resultList = constant.OrderType;
        break;
      case "ProductStatus":
        resultList = constant.ProductStatus;
        break;
      default:
        break;
    }
    res.status(200).json(createResponse({ resultList }, "Get Constant successfully"));
  } catch (err) {
    res
      .status(constant.ResponseCode.Internal_server_error.code)
      .json(createResponse(null, constant.ResponseCode.Internal_server_error.msg));
  }
};
