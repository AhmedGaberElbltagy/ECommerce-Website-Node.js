const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT));
  return hash;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatched = await bcrypt.compare(password, hashedPassword)
  return isMatched;
};

module.exports = {
  hashPassword,
  comparePassword,
};
