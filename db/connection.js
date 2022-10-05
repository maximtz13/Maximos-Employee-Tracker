const mysql = require('mysql2');

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    // ENTER YOUR PASSWORD FOR MYSQL HERE
    password: 'ENTER PASSWORD HERE',
    database: 'business'
    }
);

module.exports = db;