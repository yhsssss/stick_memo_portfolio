const mysql = require('mysql');
let db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '0000',
    database : 'myboard'
  });
  
  db.connect();

  module.exports = db;