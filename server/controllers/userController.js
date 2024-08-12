const User = require("../models/user");

async function getUser(req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getUser };