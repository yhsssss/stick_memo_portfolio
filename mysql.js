var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'opentutorials'
});
 
db.connect();
 
db.query('SELECT * from topic', function (error, results, fields) {
  if (error){
      console.log(error);
  };
  console.log(results);
});
 
db.end();