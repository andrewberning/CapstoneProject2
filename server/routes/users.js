"use strict";

/** Routes for users. */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureLoggedIn } = require('../middleware/auth');

// GET /users/:username
router.get('/:username', userController.getUser);

module.exports = router;