"use strict"

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Cart = require("../models/cart");
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");


/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
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
});

/** POST /auth/register: { user } => { token },
 *  
 *  user MUST include { username, password, firstName, lastName, email }
 * 
 *  Returns JWT token which can be used to authenticate further requests.
 * 
 *  Authorization requires: None
 */

router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if(!validator.valid) {
      const errors = validator.errors.map(e => e.stack);
      throw new BadRequestError(errors);
    }

    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    await Cart.createCart(newUser.id);
    return res.status(201).json({ token });
  } catch(err) {
    return next(err);
  }
});

module.exports = router;