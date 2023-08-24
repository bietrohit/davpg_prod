var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "davpg",
  user: "root",
  password: "admin"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con