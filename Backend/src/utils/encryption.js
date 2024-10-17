const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

exports.comparePasswords = async (userPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};
