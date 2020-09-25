const { Roles } = require("./constant");
const { bcrypt_hash, compare_bcrypt_hash } = require("./utils/bcrypt");

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
    password: "$2b$10$3y0HlOh/CiyqDvEkdeqImeC/2iHzSDsWT34ETCqyziMRLaojmquga", //asdasd
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
    permissions: [...Roles.User.permissions],
  },
];

// const permissionList = [
// {id:1,position:1}
// ]

const validateUserPassword = (email, password) => {
  const user_obj = userList.filter((user) => user.email === email);
  if (user_obj.length > 0) {
    if (compare_bcrypt_hash(password, user_obj[0].password)) return user_obj[0];
  }
  return null;
};

const insertUser = (email, name, password) => {
  if (email != null && name != null && password != null) {
    if (userList.filter((user) => user.email === email).length > 0) {
      return null;
    }
    let newUser = {
      id: userList.length + 1,
      email: email,
      name: name,
      password: bcrypt_hash(password),
      role: Roles.User,
      updated_at: "",
      created_at: "",
      permissions: [...Roles.User.permissions],
    };
    userList.push(newUser);
    return newUser;
  } else {
    return null;
  }
};

const getUserByIdPassword = (id, password) => {
  const user_obj = userList.filter((user) => user.id === id);
  if (user_obj.length > 0) {
    if (user_obj[0].password === password) {
      return user_obj[0];
    }
  }
  return null;
};

module.exports = {
  userList,
  validateUserPassword,
  getUserByIdPassword,
  insertUser,
};
