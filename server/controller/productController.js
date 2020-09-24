const { createResponse } = require("../responseFormat");
module.exports.createProduct = (req, res) => {
  res.status(200).json(createResponse({ product_id: 1 }, "Create Product successfully"));
};
