const mysql = require('mysql2');

const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    // ENTER YOUR PASSWORD FOR MYSQL HERE
    password: 'AZ2yate2?',
    database: 'business'
    }
);

module.exports = db;