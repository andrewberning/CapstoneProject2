const jsonschema = require("jsonschema");
const User = require("../models/user");
const Cart = require("../models/cart");
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

async function login(req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}

async function register(req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errors = validator.errors.map(e => e.stack);
      throw new BadRequestError(errors);
    }

    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    await Cart.createCart(newUser.id);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}

module.exports = { login, register };
