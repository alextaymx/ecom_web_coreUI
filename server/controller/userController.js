const { createResponse } = require("../responseFormat");
const { insertUser, getUser, updateUser } = require("../database");
const { ResponseCode } = require("../constant");
const { checkParams } = require("../utils/checkParams");
const { processList } = require("../utils/dbProcessData");
module.exports.createUser = (req, res) => {
  try {
    if (!checkParams(["username", "email", "password"], req.body)) {
      res
        .status(ResponseCode.Input_missing.code)
        .json(createResponse(null, ResponseCode.Input_missing.msg));
      return;
    }
    const { username, email, password } = req.body;
    const user_id = insertUser(email, username, password).id;
    res.status(200).json(createResponse({ user_id }, "Create User successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};

module.exports.getUser = (req, res) => {
  const user_id = req.params.id;
  let page = 1;
  let status = null;
  if ("page" in req.query) {
    page = req.query.page;
  }
  if ("status" in req.query) {
    status = req.query.status;
  }
  const resultList = getUser(user_id, page, 10, status);
  const userList = processList(resultList.data, "user");
  res.status(ResponseCode.General_success.code).json(
    createResponse(
      {
        resultList: userList,
        totalUsers: resultList.tableInfo.size,
        currentPage: page,
        totalPage: resultList.tableInfo.totalPages,
      },
      resultList.length > 0 ? ResponseCode.General_success.msg : "No content"
    )
  );
};

module.exports.updateUser = (req, res) => {
  try {
    const req_body = req.body;
    if (!("id" in req_body)) {
      throw new Error("User id not found");
    }
    if (getUser(req_body.id, 1).data.length === 0) {
      res.status(400).json(createResponse(null, "User not found"));
      return;
    }
    updateUser(req_body);
    res
      .status(200)
      .json(createResponse({ user_id: req_body.id }, "Update User successfully"));
  } catch (err) {
    res
      .status(ResponseCode.Internal_server_error.code)
      .json(createResponse(null, ResponseCode.Internal_server_error.msg));
  }
};
