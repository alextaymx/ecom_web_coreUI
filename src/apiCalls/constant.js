export const PERMISSION = {
  Create_User: 1,
  Update_User: 2,
  Delete_User: 3,
  Create_Product: 4,
  Update_Product: 5,
  Delete_Product: 6,
  Create_Order: 7,
  Update_Order: 8,
  Cancel_Order: 9,
};
export const checkPermission = (currentPermission, permission) => {
  return currentPermission.includes(permission);
};
