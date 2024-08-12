require("dotenv").config();
require("colors");

const DB_URI = (process.env.NODE_ENV === "test")
  ? "postgresql:///shoply_test"
  : process.env.POSTGRES_URL;

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const PORT = +process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, DB_URI);
console.log("---");

module.exports = {
  DB_URI,
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};