const { productVarList, supplierList, orderList, productList } = require("../database");
const _ = require("lodash");

const getElementByIndexArr = (input_list, index_arr) => {
  if (!Array.isArray(index_arr)) {
    return [];
  }
  let result = [];
  input_list.forEach((element) => {
    if (index_arr.includes(element.id)) {
      result.push(element);
    }
  });
  return result;
};

const processProductVar = (productVar) => {
  productVar.orders = getElementByIndexArr(orderList, productVar.orders);
  productVar.supplier = productVar.supplier
    ? getElementByIndexArr(supplierList, [productVar.supplier])[0]
    : null;
  return productVar;
};

const processProduct = (product) => {
  product.variations = getElementByIndexArr(productVarList, product.variations);
  product.variations.forEach((productVar, index) => {
    let temp = _.cloneDeep(product.variations[index]);
    product.variations[index] = processProductVar(temp);
  });
  return product;
};

const processSupplier = (supplier) => {
  supplier.products = getElementByIndexArr(productVarList, supplier.products);
  supplier.products.forEach((productVar, index) => {
    let temp = _.cloneDeep(supplier.products[index]);
    supplier.products[index] = processProductVar(temp);
  });
  return supplier;
};

module.exports = {
  processProduct,
  processProductVar,
  processSupplier,
};
