const mysql = require("mysql");
const sqlConnection = mysql.createConnection({
  host: "localhost",       
  port: 3306,             
  user: "root",            
  password: "admin",       
  database: "db_helpDesk",     
});

module.exports = sqlConnection;