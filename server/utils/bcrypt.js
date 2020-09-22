const bcrypt = require("bcrypt");
const saltRounds = 10;

const bcrypt_hash = (password) => {
  const hashed = bcrypt.hashSync(password, saltRounds);
  return hashed;
};

const compare_bcrypt_hash = (ori_text, hashed_text) => {
  const isSame = bcrypt.compareSync(ori_text, hashed_text);
  return isSame;
};

module.exports = {
  bcrypt_hash,
  compare_bcrypt_hash,
};
