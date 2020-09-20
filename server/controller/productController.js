const { createResponse } = require("../responseFormat");
module.exports.createProduct = (req, res) => {
  console.log("create product");
  res
    .status(200)
    .json(createResponse(200, { product_id: 1 }, "Create Product successfully"));
};
