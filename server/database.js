const { Roles, OrderType, CountryList } = require("./constant");
const { bcrypt_hash, compare_bcrypt_hash } = require("./utils/bcrypt");
const faker = require("faker");
const faker_cn = require("faker/locale/zh_CN");
const moment = require("moment");
const _ = require("lodash");
const userCount = 200;
const productCount = 300;
const productVarCount = 1200;
const orderCount = 600;
const supplierCount = 200;
const getRandomNum = (min, max, count) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(Math.floor(Math.random() * (max - min) + min));
  }
  return [...new Set(result)];
};

const groupBy = (list, by, isDate = false) => {
  return !isDate
    ? _(list).groupBy(by)
    : _(list).groupBy((x) => moment(x[by]).toISOString().split("T")[0]);
};

const randomLastWeekDate = () =>
  moment(new Date()).subtract(getRandomNum(0, 7, 1)[0], "days").toISOString();

let userList = [
  {
    id: 1,
    email: "l_weixiang@outlook.com",
    name: "xiaosha007",
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
    role: Roles.SuperAdmin.id,
    updatedAt: randomLastWeekDate(),
    createdAt: randomLastWeekDate(),
    permissions: [...Roles.SuperAdmin.permissions],
    status: 1,
  },
  {
    id: 2,
    email: "testing1@outlook.com",
    name: "wenjie",
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
    role: Roles.SuperAdmin.id,
    updatedAt: randomLastWeekDate(),
    createdAt: randomLastWeekDate(),
    permissions: [...Roles.SuperAdmin.permissions],
    status: 1,
  },
  {
    id: 3,
    email: "alextay0naruto@gmail.com",
    name: "alextay",
    password: "$2b$10$3y0HlOh/CiyqDvEkdeqImeC/2iHzSDsWT34ETCqyziMRLaojmquga", //asdasd
    role: Roles.SuperAdmin.id,
    updatedAt: randomLastWeekDate(),
    createdAt: randomLastWeekDate(),
    permissions: [...Roles.SuperAdmin.permissions],
    status: 1,
  },
  {
    id: 4,
    email: "testing3@outlook.com",
    name: "teoshengpu",
    password: "$2b$10$mOtHQBFtVoA/Kts3xvO0GuQx2L0biAJIDk8ThijvLMjpb6tCGuro.",
    role: Roles.User.id,
    updatedAt: randomLastWeekDate(),
    createdAt: randomLastWeekDate(),
    permissions: [...Roles.User.permissions],
    status: 1,
  },
];

const validateUserPassword = (email, password) => {
  const user_obj = userList.filter((user) => user.email === email);
  if (user_obj.length > 0) {
    if (compare_bcrypt_hash(password, user_obj[0].password)) return user_obj[0];
  }
  return null;
};

const insertUser = (email, name, password, createdAt = new Date().toISOString()) => {
  if (email != null && name != null && password != null) {
    if (userList.filter((user) => user.email === email).length > 0) {
      return null;
    }
    let newUser = {
      id: userList.length + 1,
      email: email,
      name: name,
      password: bcrypt_hash(password),
      role: Roles.User.id,
      updatedAt: new Date().toISOString(),
      createdAt: createdAt,
      permissions: [...Roles.User.permissions],
      status: 2, // 1 is active, 2 is pending, 3 is inactive
    };
    userList.push(newUser);
    return newUser;
  } else {
    return null;
  }
};

const getUser = (
  user_id,
  page_num = 1,
  itemsPerPage = 10,
  status = null,
  sortBy = "name",
  order = "asc"
) => {
  let result =
    status !== null
      ? userList.filter((user) => user.status.toString() === status.toString())
      : userList;
  result =
    user_id === "*" ? result : result.filter((user) => user.id === parseInt(user_id));
  sortList(result, sortBy, order);
  return packWithTableInfo(result, itemsPerPage, page_num);
};

const updateUser = (user_body) => {
  userList.forEach((user, index) => {
    if (user.id === parseInt(user_body.id)) {
      userList[index] = { ...user, ...user_body };
      if ("role" in user_body)
        Object.keys(Roles).forEach((Role_key) => {
          if (Roles[Role_key].id === parseInt(userList[index].role)) {
            userList[index].permissions = Roles[Role_key].permissions;
          }
        });
    }
  });
};

const generateUser = (count) => {
  [...Array(count).keys()].map((i) => {
    return insertUser(
      faker.internet.email(),
      faker.internet.userName(),
      faker.internet.password(),
      randomLastWeekDate()
    );
  });
};
generateUser(userCount);

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
const generateOrder = (count) =>
  [...Array(count).keys()].map((i) => {
    return {
      id: i,
      number: faker.random.number(),
      createdAt: randomLastWeekDate(),
      updatedAt: randomLastWeekDate(),
      type: getRandomNum(1, 3, 1)[0], //1 for purchase order, 2 for sales order
      remarks: "a",
      productVariant: 1,
      product: [i % productCount],
      quantity: { initial: faker.random.number(), final: faker.random.number() },
      recipientName: faker.name.findName(),
      country: CountryList[getRandomNum(0, CountryList.length, 1)[0]].code,
      contactNumber: {
        phone: faker.phone.phoneNumber(),
        mobile: faker.phone.phoneNumber(),
      },
      address: {
        address1: faker.address.streetAddress(),
        address2: faker.address.secondaryAddress(),
        state: faker.address.state(),
        city: faker.address.city(),
        postcode: faker.address.zipCode(),
      },
      shippingFee: faker.random.float(),
      shippingType: "Pos Laju",
      referenceNumber: faker.time.recent(),
      paymentAmount: faker.random.float(),
      productDetails: {},
    };
  });
let orderList = generateOrder(orderCount);
const addOrder = (newOrder) => {
  let order = { ...newOrder, id: orderList.length };
  orderList.push(order);
  return order.id;
};

const updateOrder = (order_body) => {
  orderList.forEach((order, index) => {
    if (parseInt(order.id) === parseInt(order_body.order_id)) {
      orderList[index] = { ...order, ...order_body };
      delete orderList[index].order_id;
    }
  });
};

const deleteOrder = (order_id) => {
  orderList = orderList.filter((order) => order.id !== parseInt(order_id));
};

const getOrder = (order_id, page_num, itemsPerPage = 10) => {
  let result =
    order_id === "*"
      ? orderList
      : orderList.filter((order) => parseInt(order.id) === parseInt(order_id));
  return packWithTableInfo(result, itemsPerPage, page_num);
};

/*Product Variation*/
const generateProductVar = (count) =>
  [...Array(count).keys()].map((i) => {
    return {
      id: i,
      itemNo: faker.random.number().toString(),
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
      orderBy: randomLastWeekDate(),
      releaseBy: randomLastWeekDate(),
      resale: true,
      createdAt: randomLastWeekDate(),
      updatedAt: randomLastWeekDate(),
      orders: [i],
      supplier: null,
      status: getRandomNum(1, 4, 1)[0], // 1 is active, 2 is pending, 3 is inactive
    };
  });

let productVarList = generateProductVar(productVarCount);

const addProductVar = (newProductVar) => {
  let productvar = { ...newProductVar, id: productVarList.length };
  productVarList.push(productvar);
  return productvar.id;
};

const updateProductVar = (productVar_body) => {
  productVarList.forEach((productVar, index) => {
    if (parseInt(productVar.id) === parseInt(productVar_body.product_id)) {
      productVarList[index] = { ...productVar, ...productVar_body };
    }
  });
};

const deleteProductVar = (product_id) => {
  productVarList = productVarList.map((productVar) => {
    if (parseInt(productVar.id) === parseInt(product_id)) {
      productVar.status = 3;
    }
    return productVar;
  });
};

const getProductVar = (product_id, page_num, itemsPerPage = 10) => {
  let result =
    product_id === "*"
      ? productVarList
      : productVarList.filter(
          (productVar) => parseInt(productVar.id) === parseInt(product_id)
        );
  return packWithTableInfo(result, itemsPerPage, page_num);
};

/*Product*/
const generateProduct = (count) => {
  let temp = [];
  for (let i = 0; i < count; i++) {
    temp.push({
      id: i,
      masterSku: faker.random.uuid(),
      remarks: null,
      createdAt: randomLastWeekDate(),
      updatedAt: randomLastWeekDate(),
      createdBy: getRandomNum(1, userList.length + 1, 1)[0],
      variations: [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3],
    });
  }
  return temp;
};

let productList = generateProduct(productCount);

const addProduct = (newProduct) => {
  let product = { ...newProduct, id: productList.length };
  productList.push(product);
  return product.id;
};

const updateProduct = (product_body) => {
  productList.forEach((product, index) => {
    if (parseInt(product.id) === parseInt(product_body.product_id)) {
      productList[index] = { ...product, ...product_body };
      delete productList[index].product_id;
    }
  });
};

const deleteProduct = (product_id) => {
  productList = productList.map((product) => {
    if (parseInt(product.id) === parseInt(product_id)) {
      product.variations.forEach((productVarId) => {
        deleteProductVar(productVarId);
      });
    }
  });
};

const filterByKeyword = (prodList, keyword) => {
  const filterMasterSku = prodList.filter((prod) =>
    prod.masterSku.toString().toLowerCase().includes(keyword)
  );
  const filterProdvar = prodList
    .filter((prod) => !prod.masterSku.toString().toLowerCase().includes(keyword))
    .map((prod) => {
      const validVar = productVarList.filter(
        (productVar) =>
          prod.variations.includes(productVar.id) &&
          (productVar.itemNo.toString().toLowerCase().includes(keyword) ||
            productVar.title.toString().toLowerCase().includes(keyword))
      );
      let temp = _.cloneDeep(prod);
      temp.variations = validVar.map((productVar) => productVar.id);
      return temp;
    });
  return filterMasterSku.concat(filterProdvar);
};

const getProduct = (
  product_id,
  page_num,
  itemsPerPage = 10,
  status = null,
  keyword = null,
  sortBy = "createdAt",
  order = "desc"
) => {
  let result =
    product_id === "*"
      ? productList
      : productList.filter((productVar) => productVar.id === parseInt(product_id));
  result =
    status !== null
      ? result.map((product) => {
          const validVar = productVarList.filter(
            (productVar) =>
              product.variations.includes(productVar.id) &&
              parseInt(productVar.status) === parseInt(status)
          );
          let temp = _.cloneDeep(product);
          temp.variations = validVar.map((productVar) => productVar.id);
          return temp;
        })
      : result;
  result =
    keyword === null ? result : filterByKeyword(result, keyword.toString().toLowerCase());
  result = result.filter((product) => product.variations.length > 0);
  !(sortBy === "createdBy")
    ? sortList(result, sortBy, order)
    : result.sort((a, b) => {
        return order === "asc"
          ? getUser(a.createdBy).data[0].name.localeCompare(
              getUser(b.createdBy).data[0].name
            )
          : getUser(b.createdBy).data[0].name.localeCompare(
              getUser(a.createdBy).data[0].name
            );
      });
  return packWithTableInfo(result, itemsPerPage, page_num);
};

/*Supplier*/
const generateSupplier = (count) =>
  [...Array(count).keys()].map((i) => {
    productVarList[i * 2].supplier = i;
    productVarList[i * 2 + 1].supplier = i;
    return {
      id: i,
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      telNo: faker.phone.phoneNumber(),
      faxNo: faker.phone.phoneNumber(),
      website: faker.internet.url(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      products: [i * 2, i * 2 + 1],
    };
  });
let supplierList = generateSupplier(supplierCount);
const addSupplier = (newSupplier) => {
  let supplier = { ...newSupplier, id: supplierList.length };
  supplier.products.forEach((productVar_id) => {
    productVarList.forEach((productVar, index) => {
      if (parseInt(productVar_id) === parseInt(productVar.id)) {
        productVarList[index].supplier = supplier.id;
      }
    });
  });
  supplierList.push(supplier);
  return supplier.id;
};

const updateSupplier = (supplier_body) => {
  supplierList.forEach((supplier, index) => {
    if (parseInt(supplier.id) === parseInt(supplier_body.supplier_id)) {
      supplierList[index] = { ...supplier, ...supplier_body };
      delete supplierList[index].supplier_id;
    }
  });
};

const deleteSupplier = (supplier_id) => {
  supplierList = supplierList.filter((supplier) => supplier.id !== parseInt(supplier_id));
};

const getSupplier = (
  supplier_id,
  page_num,
  itemsPerPage = 10,
  sortBy = "name",
  order = "asc"
) => {
  let result =
    supplier_id === "*"
      ? supplierList
      : supplierList.filter(
          (supplier) => parseInt(supplier.id) === parseInt(supplier_id)
        );
  sortList(result, sortBy, order);
  return packWithTableInfo(result, itemsPerPage, page_num);
};

const getTable = (table) => {
  switch (table) {
    case "supplier":
      return supplierList;
    case "order":
      return orderList;
    case "product":
      return productList;
    case "productVar":
      return productVarList;
    case "user":
      return userList;
    default:
      return null;
  }
};

const getTableInfo = (list, itemsPerPage = 10) => {
  const size = list.length;
  const totalPages =
    size % itemsPerPage !== 0
      ? parseInt(size / itemsPerPage) + 1
      : parseInt(size / itemsPerPage);
  return { size, totalPages };
};

const packWithTableInfo = (list, itemsPerPage, currentPage) => {
  return {
    data: list.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage),
    tableInfo: getTableInfo(list, itemsPerPage),
  };
};

const sortList = (list, sortBy, order = "asc") => {
  list.sort((a, b) => {
    return order === "asc"
      ? Number.isInteger(a[sortBy])
        ? a[sortBy] - b[sortBy]
        : a[sortBy].localeCompare(b[sortBy])
      : Number.isInteger(a[sortBy])
      ? b[sortBy] - a[sortBy]
      : b[sortBy].localeCompare(a[sortBy]);
  });
};

const getStatistics = (days = 7, table) => {
  const allDates = [...Array(days).keys()].map(
    (i) => moment(new Date()).subtract(i, "days").toISOString().split("T")[0]
  );
  const data = getTable(table).filter(
    (item) =>
      moment.duration(moment(new Date()).diff(moment(item.createdAt))).asDays() <= days
  );
  const group = groupBy(data, "createdAt", true).value();
  let result = { values: [], labels: [] };
  allDates.map((item) => {
    result.values.push(item);
    item in group ? result.labels.push(group[item].length) : result.labels.push(0);
    return true;
  });
  return result;
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
  groupBy,
  getTable,
  getStatistics,
  getUser,
  updateUser,
};
