var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  database: "davpg",
  user: "root",
  password: "root"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con