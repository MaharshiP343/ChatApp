const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const dbconfig = require("./config/ConfigDB");

const app = require("./app");

const port = process.env.Port_num || 3000;

app.listen(port, () => {
  console.log("listening to req on: " + port);
});
