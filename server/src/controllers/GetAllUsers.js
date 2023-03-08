const DBConn = require('../database/DBConn')

require('dotenv').config();
const GetAllUsers = (req, res, next) => {
    const querry = `SELECT * from users`;
        DBConn.query(querry, (err, rows, fields) => {
            console.log(rows);
            if (err) {
                res.json({
                    status: false,
                    message: err.stack,
                })
            } else {
                res.json({
                    status: true,
                    message: 'Here is the List of Users',
                    data: rows,
                })
            }
        });
}
module.exports = GetAllUsers;