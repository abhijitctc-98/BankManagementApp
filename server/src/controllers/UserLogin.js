const DBConn = require('../database/DBConn');
const UserLogin = (req, res, next) => {
    const { userMailID, userPassword } = req.body;
    const querry = `SELECT * from users WHERE userMailID = ? AND userPassword = ?`;

    DBConn.query(querry, [ userMailID, userPassword ], (err, rows, fields) => {
        if (err) {
            res.json({
                status: false,
                message: err.stack,
            });
        } else {
            if (rows.length > 0) {
                res.json({
                    status: true,
                    message: `User Login Successfull`,
                });
            } else {
                res.json({
                    status: false,
                    message: `Invalid Credentials, Try Again`,
                });
            }
        }
    });
}

module.exports = UserLogin;