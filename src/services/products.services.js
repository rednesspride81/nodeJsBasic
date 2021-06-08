// import thư viện file system của nodeJs vào
const fs = require("fs");

// Đọc data từ file
const getListProducts = () => {
  let listProducts = fs.readFileSync("./src/products.json");
  //   Đổi kiểu dữ liệu buffter thành json
  listProducts = JSON.parse(listProducts);
  return listProducts;
};

// Cập nhật dữ liệu file data
const updateListProducts = (newListProducts) => {
  fs.writeFileSync("./src/products.json", JSON.stringify(newListProducts));
};

module.exports = { getListProducts, updateListProducts };
