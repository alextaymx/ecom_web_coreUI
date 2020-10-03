const { createResponse } = require("../responseFormat");
const {
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
const { processSupplier } = require("../utils/dbProcessData");
module.exports.createSupplier = (req, res) => {
  try {
    if (!checkParams(["name", "products"], req.body)) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }
    const { name, products, address, email, telNo, faxNo, website } = req.body;
    const newSupplier = {
      name,
      products,
      address: address ? address : null,
      email: email ? email : null,
      telNo: telNo ? telNo : null,
      faxNo: faxNo ? faxNo : null,
      website: website ? website : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const supplier_id = addSupplier(newSupplier);
    res.status(200).json(createResponse({ supplier_id }, "Create Supplier successfully"));
  } catch (err) {
    console.log(err);
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getSupplier = (req, res) => {
  const supplier_id = req.params.id;
  let page = 1;
  if ("page" in req.query) {
    page = req.query.page;
  }
  let resultList = JSON.parse(JSON.stringify(getSupplier(supplier_id, page)));
  resultList.forEach((result, index) => {
    resultList[index] = processSupplier(result);
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

module.exports.updateSupplier = (req, res) => {
  try {
    const req_body = req.body;
    if (!("supplier_id" in req_body)) {
      throw new Error("Order id not found");
    }
    if (getSupplier(req_body.supplier_id).length === 0) {
      res.status(400).json(createResponse(null, "Order not found"));
      return;
    }
    updateSupplier(req_body);
    res
      .status(200)
      .json(
        createResponse(
          { supplier_id: req_body.supplier_id },
          "Update Supplier successfully"
        )
      );
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.deleteSupplier = (req, res) => {
  try {
    const { supplier_id } = req.body;
    if (getSupplier(supplier_id).length === 0) {
      res.status(400).json(createResponse(null, "Supplier not found"));
      return;
    }
    deleteSupplier(supplier_id);
    res.status(200).json(createResponse({ supplier_id }, "Delete Supplier successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};
