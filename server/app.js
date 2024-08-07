"use strict";

/** Express app for shoply */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const authenticateJWT = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/cart", cartRoutes);

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