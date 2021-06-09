// thư viện yargs dùng để tạo câu lệnh trong nodeJs
const yargs = require("yargs");

const {
  getListProducts,
  updateListProducts,
} = require("./services/products.services");

// Lấy danh sách tất cả sản phẩm
yargs.command({
  command: "getAllProducts",
  handler: () => {
    let listProducts = getListProducts();
    console.log("Danh sách sản phẩm:", listProducts);
  },
});

// Thêm sản phẩm
yargs.command({
  command: "add",
  builder: {
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { name, price, amount, description } = args;
    let listProducts = getListProducts();
    listProducts = [
      ...listProducts,
      { id: Math.random().toString(), name, price, amount, description },
    ];
    updateListProducts(listProducts);
    console.log("Thêm thành công sản phẩm", name);
  },
});

// Xóa
yargs.command({
  command: "remove",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    2;
    let listProducts = getListProducts();
    listProducts = listProducts.filter((product) => product.id != id);
    updateListProducts(listProducts);
    console.log("Đã xóa thành công sản phẩm:", id);
  },
});

// Sửa
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    price: {
      type: "number",
    },
    amount: {
      type: "number",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, name, price, amount, description } = args;
    let listProducts = getListProducts();
    let index = listProducts.findIndex((product) => product.id == id);
    if (index == -1) {
      console.log("id sản phẩm không hợp lệ");
      return;
    }
    listProducts[index] = { id, name, price, amount, description };
    updateListProducts(listProducts);
    console.log("Cập nhật thành công sản phẩm", id);
  },
});

// Lấy 1 sản phẩm
yargs.command({
  command: "getProduct",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    let { id } = args;
    let listProducts = getListProducts();
    product = listProducts.find((product) => (product.id = id));
    if (!product) {
      console.log("Không tìm được sản phẩm");
    }
    console.log("Sản phẩm", id, ":", product);
  },
});

// Nhập hàng
yargs.command({
  command: "import",
  buillder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    let listProducts = getListProducts();
    let index = listProducts.findIndex((product) => product.id == id);
    // Nếu không tìm đc sản phẩm
    if (index == -1) {
      console.log("id sản phẩm không hợp lệ");
      return;
    }
    listProducts[index].amount = listProducts[index].amount + 50;
    updateListProducts(listProducts);
    console.log("Nhập hàng thành công");
  },
});

yargs.parse();
