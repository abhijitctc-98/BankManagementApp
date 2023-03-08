const DBConn = require('../database/DBConn');
const GetUserById = (req, res, next) => {
    const { userID } = req.params.userID;
        const querry = `SELECT * from users WHERE userID = '${req.params.userID}'`;

        DBConn.query(querry, (err, rows, fields) => {
            if (err) {
                res.json({
                    status: false,
                    message: err.stack,
                });
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.json({
                        status: true,
                        message: 'User Found!!',
                        data: rows,
                    });
                } else {
                    res.json({
                        status: false,
                        message: 'No User Found!!',
                    });
                }
            }
        });
}
module.exports = GetUserById;