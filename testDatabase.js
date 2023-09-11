var mySql = require('sync-mysql');

var connection = new mySql({
    host: 'localhost',
    user: 'root',
    password: 'Admin',
    database: "telefondb"
});

var resultat = connection.query('SELECT * from telefonkatalog');
console.log(resultat);
