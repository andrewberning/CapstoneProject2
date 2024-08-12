"use strict";

/** Routes for authentication. */

const express = require("express");
const router = new express.Router();
const authController = require("../controllers/authController");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/token", authController.login);

/** POST /auth/register: { user } => { token },
 *  
 *  user MUST include { username, password, firstName, lastName, email }
 * 
 *  Returns JWT token which can be used to authenticate further requests.
 * 
 *  Authorization requires: None
 */
router.post("/register", authController.register);

module.exports = router;
