const { createResponse } = require("../responseFormat");
const { getOrder, addOrder, updateOrder, deleteOrder } = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
module.exports.createOrder = (req, res) => {
  try {
    if (!checkParams(["type"], req.body)) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }

    const {
      type,
      remarks,
      productVariant,
      product,
      quantity,
      recipientName,
      country,
      contactNumber,
      address,
      shippingFee,
      referenceNumber,
      paymentAmount,
      productDetails,
      shippingType,
    } = req.body;
    const newOrder = {
      number: new Date(),
      type, //1 for purchase order, 2 for sales order
      remarks: remarks ? remarks : null,
      productVariant: productVariant ? productVariant : null,
      product: product ? product : null,
      quantity: quantity ? quantity : null,
      recipientName: recipientName ? recipientName : null,
      country: country ? country : null,
      contactNumber: contactNumber ? contactNumber : null,
      address: address ? address : null,
      shippingFee: shippingFee ? shippingFee : null,
      shippingType: shippingType ? shippingType : null,
      referenceNumber: referenceNumber ? referenceNumber : null,
      paymentAmount: paymentAmount ? paymentAmount : null,
      productDetails: productDetails ? productDetails : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const order_id = addOrder(newOrder);
    res.status(200).json(createResponse({ order_id }, "Create Order successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getOrder = (req, res) => {
  const order_id = req.params.id;
  let page = 1;
  if ("page" in req.query) {
    page = req.query.page;
  }
  const resultList = getOrder(order_id, page);
  res.status(ResponseCode.General_success.code).json(
    createResponse(
      {
        resultList: resultList.data,
        totalProducts: resultList.tableInfo.size,
        currentPage: page,
        totalPage: resultList.tableInfo.totalPages,
      },
      resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
    )
  );
};

module.exports.updateOrder = (req, res) => {
  try {
    const req_body = req.body;
    if (!("order_id" in req_body)) {
      throw new Error("Order id not found");
    }
    if (getOrder(req_body.order_id).length === 0) {
      res.status(400).json(createResponse(null, "Order not found"));
      return;
    }
    updateOrder(req_body);
    res
      .status(200)
      .json(createResponse({ order_id: req_body.order_id }, "Update Order successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.deleteOrder = (req, res) => {
  try {
    const { order_id } = req.body;
    if (getOrder(order_id).length === 0) {
      res.status(400).json(createResponse(null, "Order not found"));
      return;
    }
    deleteOrder(order_id);
    res.status(200).json(createResponse({ order_id }, "Delete Order successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};
