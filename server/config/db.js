/** Database setup for shoply. */

const { Client } = require("pg");
const { getDatabaseUri } = require("./config")
// const { DB_URI } = require("./config");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///jobly_test";
} else {
  "postgres://qtlxddvu:9AapQXd0wpq5dQCyugzefWrH3emu8stW@kala.db.elephantsql.com/qtlxddvu"
}

// const client = new Client(DB_URI);
let db = new Client({
  connectionString: DB_URI
});

db.connect();


module.exports = db;
