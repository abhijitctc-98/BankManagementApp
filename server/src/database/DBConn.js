const mysql = require('mysql');
const config = require("../config/config");

const DBConn = mysql.createConnection(config);

module.exports = DBConn