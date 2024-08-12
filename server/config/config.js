/** Common config for shoply */

// read .env files and make environmental variables

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret";
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "jobly_test"
      : process.env.DATABASE_URL || "shoply";
}

// const DB_URI = (process.env.NODE_ENV === "test")
//   ? "postgresql:///shoply_test"
//   : "postgres://qtlxddvu:9AapQXd0wpq5dQCyugzefWrH3emu8stW@kala.db.elephantsql.com/qtlxddvu";



const BCRYPT_WORK_FACTOR = 12;

console.log("Shoply Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};