module.exports.checkParams = (check_list, obj) => {
  for (let i = 0; i < check_list.length; i++) {
    if (!(check_list[i] in obj)) return false;
  }
  return true;
};
