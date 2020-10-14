export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Main"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-chart",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Products"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Product List",
    to: "/productList",
    icon: "cil-list",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Create Product",
  //   to: "/createProduct",
  //   icon: "cil-plus",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Users"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "User List",
    to: "/userList",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Create User",
    to: "/createUser",
    icon: "cil-plus",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Suppliers"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Supplier List",
    to: "/supplierList",
    icon: "cil-list",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Create Supplier",
    to: "/createSupplier",
    icon: "cil-plus",
  },
];
