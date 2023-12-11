require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const SECRET = "SECRET";

function createToken(payload) {
  return sign(payload, SECRET);
}

function verifyToken(token) {
  return verify(token, SECRET);
}

function hashPassword(password) {
  let salt = genSaltSync(10);
  let hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

function comparePassword(input, hashedPassword) {
  return compareSync(input, hashedPassword);
}

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
