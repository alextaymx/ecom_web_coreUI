const { Roles } = require("./constant");

let userList = [
  {
    id: 1,
    email: "l_weixiang@outlook.com",
    name: "xiaosha007",
    password: "testing123",
    role: Roles.SuperAdmin.id,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.SuperAdmin.permissions],
  },
  {
    id: 2,
    email: "testing1@outlook.com",
    name: "wenjie",
    password: "testing123",
    role: Roles.SuperAdmin,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.SuperAdmin.permissions],
  },
  {
    id: 3,
    email: "alextay0naruto@gmail.com",
    name: "alextay",
    password: "alextay123",
    role: Roles.SuperAdmin,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.SuperAdmin.permissions],
  },
  {
    id: 4,
    email: "testing3@outlook.com",
    name: "teoshengpu",
    password: "shengpu123",
    role: Roles.User,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.SuperAdmin.permissions],
  },
];

// const permissionList = [
// {id:1,position:1}
// ]

const validateUserPassword = (email, password) => {
  const user_obj = userList.filter((user) => user.email === email);
  if (user_obj.length > 0) {
    if (user_obj[0].password === password) return user_obj[0];
  }
  return null;
};

const insertUser = (email, name, password) => {
  if (email != null && name != null && password != null) {
    if (userList.filter((user) => user.email === email).length > 0) {
      return null;
    }
    let newUser = {
      id: userList.length,
      email: email,
      name: name,
      password: password,
      role: Roles.User,
      updated_at: "",
      created_at: "",
      permissions: [...Roles.SuperAdmin.permissions],
    };
    userList.push(newUser);
    return newUser;
  } else {
    return null;
  }
};

const getUserById = (id) => {
  const user_obj = userList.filter((user) => user.id === id);
  return user_obj[0];
};

module.exports = {
  userList,
  validateUserPassword,
  getUserById,
  insertUser,
};
