const Permissions = {
  Create_User: 1,
  Update_User: 2,
  Delete_User: 3,
  Create_Product: 4,
  Update_Product: 5,
  Delete_Product: 6,
};

const Roles = {
  SuperAdmin: {
    id: 1,
    permissions: [
      Permissions.Create_Product,
      Permissions.Update_Product,
      Permissions.Delete_Product,
      Permissions.Create_User,
      Permissions.Update_User,
      Permissions.Delete_User,
    ],
  },
  User: {
    id: 2,
    permissions: [
      Permissions.Update_Product,
      Permissions.Create_Product,
      Permissions.Delete_Product,
    ],
  },
};

module.exports = {
  Permissions,
  Roles,
};
