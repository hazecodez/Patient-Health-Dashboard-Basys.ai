const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

exports.verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
