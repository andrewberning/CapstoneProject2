"use strict";

/** Express app for shoply */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const categoriesRoutes = require("./routes/categories");

const app = express();

app.use(cors());

app.use("/categories", categoriesRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;