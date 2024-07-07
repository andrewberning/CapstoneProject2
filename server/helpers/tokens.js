const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

/** return signed JWT token from user data. */

function createToken(user) {
  let payload = {
    username: user.username,
  };
  console.log("createToken payload:", payload);

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };