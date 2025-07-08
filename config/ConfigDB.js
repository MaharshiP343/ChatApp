const mongoose = require("mongoose");

mongoose.connect(process.env.Conn);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Conneted to db");
});

db.on("err", () => {
  console.log("Failed DB connect");
});

module.exports = db;
