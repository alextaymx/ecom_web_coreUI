export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Main"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
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
    name: "Create Product",
    to: "/createProduct",
    icon: "cil-plus",
  },
];
