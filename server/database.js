const { Roles, OrderType } = require("./constant");
const { bcrypt_hash, compare_bcrypt_hash } = require("./utils/bcrypt");
const faker = require("faker");
const faker_cn = require("faker/locale/zh_CN");
const getRandomNum = (min, max, count) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(Math.floor(Math.random() * (max - min) + min));
  }
  return [...new Set(result)];
};
const getLengthOfTable = (table) => {
  switch (table) {
    case "productVar":
      return productVarList.length;
    case "product":
      return productList.length;
    case "supplier":
      return supplierList.length;
    case "order":
      return orderList.length;
    default:
      return 0;
  }
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

/*Order*/
const generateOrder = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      orderNumber: faker.random.number(),
      receiveNumber: faker.random.number(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return temp;
};
let orderList = generateOrder(20);
const addOrder = (newOrder) => {
  let order = { ...newOrder, id: orderList.length };
  orderList.push(order);
  return order.id;
};

const updateOrder = (order_body) => {
  orderList.forEach((order, index) => {
    if (order.id === parseInt(order_body.order_id)) {
      orderList[index] = { ...order, ...order_body };
    }
  });
};

const deleteOrder = (order_id) => {
  orderList = orderList.filter((order) => order.id !== parseInt(order_id));
};

const getOrder = (order_id, page_num) => {
  if (order_id === "*") {
    return orderList.slice(10 * (page_num - 1), 10 * page_num);
  } else {
    return orderList.filter((order) => order.id === parseInt(order_id));
  }
};

/*Product Variation*/
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
      orderType: OrderType.Order,
      orderBy: faker.date.past(),
      releaseBy: faker.date.future(),
      resale: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      orders: [i],
      supplier: null,
    });
  }
  return temp;
};

let productVarList = generateProductVar(40);

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
  productList.forEach((product) => {
    if (product.variations.includes(product_id)) {
      let index = product.variations.indexOf(product_id);
      product.variations.splice(index, 1);
    }
  });
  productVarList = productVarList.filter(
    (productVar) => productVar.id !== parseInt(product_id)
  );
};

const getProductVar = (product_id, page_num) => {
  if (product_id === "*") {
    return productVarList.slice(10 * (page_num - 1), 10 * page_num);
  } else {
    return productVarList.filter((productVar) => productVar.id === parseInt(product_id));
  }
};

/*Product*/
const generateProduct = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      masterSku: faker.random.uuid(),
      remarks: null,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      createdBy: getRandomNum(1, userList.length + 1, 1)[0],
      variations: [i * 2, i * 2 + 1],
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

const getProduct = (product_id, page_num) => {
  if (product_id === "*") {
    return productList.slice(10 * (page_num - 1), 10 * page_num);
  } else {
    return productList.filter((productVar) => productVar.id === parseInt(product_id));
  }
};

/*Supplier*/
const generateSupplier = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      telNo: faker.phone.phoneNumber(),
      faxNo: faker.phone.phoneNumber(),
      website: faker.internet.url(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      products: getRandomNum(0, productVarList.length, 2),
    });
  }
  return temp;
};
let supplierList = generateSupplier(20);
const addSupplier = (newSupplier) => {
  let supplier = { ...newSupplier, id: supplierList.length };
  supplier.products.forEach((productVar_id) => {
    productVarList.forEach((productVar, index) => {
      if (productVar_id === productVar.id) {
        productVarList[index].supplier = supplier.id;
      }
    });
  });
  supplierList.push(supplier);
  return supplier.id;
};

const updateSupplier = (supplier_body) => {
  supplierList.forEach((supplier, index) => {
    if (supplier.id === parseInt(supplier_body.supplier_id)) {
      supplierList[index] = { ...supplier, ...supplier_body };
    }
  });
};

const deleteSupplier = (supplier_id) => {
  supplierList = supplierList.filter((supplier) => supplier.id !== parseInt(supplier_id));
};

const getSupplier = (supplier_id, page_num) => {
  if (supplier_id === "*") {
    return supplierList.slice(10 * (page_num - 1), 10 * page_num);
  } else {
    return supplierList.filter((supplier) => supplier.id === parseInt(supplier_id));
  }
};

// const getTable = (table) => {
//   switch (table) {
//     case "supplier":
//       return supplierList;
//     case "order":
//       return orderList;
//     case "product":
//       return productList;
//     case "productVar":
//       return productVarList;
//     default:
//       return null;
//   }
// };

// const dbAdd = (tableName, newObj) => {
//   let obj = { ...newObj, id: supplierList.length };
//   supplierList.push(supplier);
//   return supplier.id;
// };

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
  productList,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  orderList,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  supplierList,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getLengthOfTable,
};
