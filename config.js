// 引入mysql
const mysql = require('mysql');

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1122334455667788',
    database: 'betterball',
    charset: 'UTF8MB4_BIN'
});

module.exports = connection;