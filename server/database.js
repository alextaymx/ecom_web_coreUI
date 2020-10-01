const { Roles } = require("./constant");
const { bcrypt_hash, compare_bcrypt_hash } = require("./utils/bcrypt");
const faker = require("faker");
const faker_cn = require("faker/locale/zh_CN");
const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let userList = [
  {
    id: 1,
    email: "l_weixiang@outlook.com",
    name: "xiaosha007",
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
    role: Roles.SuperAdmin.id,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.SuperAdmin.permissions],
  },
  {
    id: 2,
    email: "testing1@outlook.com",
    name: "wenjie",
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
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
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
    role: Roles.User,
    updated_at: "",
    created_at: "",
    permissions: [...Roles.User.permissions],
  },
];

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

const generateProductVar = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      itemNo: faker.random.number(),
      title: faker.commerce.productName(),
      chineseTitle: faker_cn.commerce.productName(),
      image: faker.image.animals(),
      version: "v1.2.5",
      brand: faker.vehicle.manufacturer(),
      numberOfKind: faker.random.number(),
      remarks: faker.commerce.productDescription(),
      package: null,
      packageSize: null,
      manufacturer: faker.company.companyName(),
      moq: null,
      ct: null,
      retailPrice: faker.commerce.price(),
      supplyPrice: faker.commerce.price(),
      supplyRate: 0,
      orderType: null,
      orderBy: faker.date.past(),
      releaseBy: faker.date.future(),
      resale: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      orders: [],
      supplier: [],
    });
  }
  return temp;
};

let productVarList = generateProductVar(3);

const addProductVar = (newProductVar) => {
  let productvar = { ...newProductVar, id: productVarList.length };
  productVarList.push(productvar);
  return productvar.id;
};

const updateProductVar = (productVar_body) => {
  productVarList.forEach((productVar, index) => {
    if (productVar.id === parseInt(productVar_body.product_id)) {
      productVarList[index] = { ...productVar, ...productVar_body };
    }
  });
};

const deleteProductVar = (product_id) => {
  productVarList = productVarList.filter(
    (productVar) => productVar.id !== parseInt(product_id)
  );
};

const getProductVar = (product_id) => {
  if (product_id === "*") {
    return productVarList;
  } else {
    return productVarList.filter((productVar) => productVar.id === parseInt(product_id));
  }
};

const generateProduct = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      masterSku: faker.random.uuid(),
      remarks: null,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      createdBy: getRandomNum(1, userList.length + 1),
      variations: [getRandomNum(0, productVarList.length)],
    });
  }
  return temp;
};

let productList = generateProduct(20);

const addProduct = (newProduct) => {
  let product = { ...newProduct, id: productList.length };
  productList.push(product);
  return product.id;
};

const updateProduct = (product_body) => {
  productList.forEach((product, index) => {
    if (product.id === parseInt(product_body.product_id)) {
      productList[index] = { ...product, ...product_body };
    }
  });
};

const deleteProduct = (product_id) => {
  productList = productList.filter((product) => product.id !== parseInt(product_id));
};

const getProduct = (product_id) => {
  if (product_id === "*") {
    return productList;
  } else {
    return productList.filter((productVar) => productVar.id === parseInt(product_id));
  }
};

module.exports = {
  userList,
  validateUserPassword,
  getUserByIdPassword,
  insertUser,
  productVarList,
  addProductVar,
  updateProductVar,
  deleteProductVar,
  getProductVar,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
