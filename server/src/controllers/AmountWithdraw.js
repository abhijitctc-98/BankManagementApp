const DBConn = require('../database/DBConn');
const MailAlert = require('../mail/MailAlert');
const AmountWithdraw = (req, res, next) => {
    const querry = `UPDATE users SET acBalance = (acBalance - ?) WHERE userID = '${req.params.userID}'`;

    const { amount, userName, userMailID, acBalance } = req.body;

    if ( acBalance > 0 ) {
        DBConn.query(querry, [ amount, userName, userMailID], (err, rows, fields) => {
            if (err) {
                res.json({
                    status: false,
                    message: err.stack,
                });
            } else {
                console.log("Rows:\t"+rows);
                if (rows.affectedRows > 0) {
                const Note = `<html>
                <body>
                <h3> Dear ${userName},</h3>
                <p class="lead">Your A/C got Debitted with Rs. '${amount}' /-.</br>
                <p> Available Balance in your A/C: '${acBalance - amount}'</p></br>
                <hr class="my-4">
                <p><h3>Thanks<br>Team Apna Bank</h3></p>
               </body>
               </html>`;

               const subject = `Amount Debitted`;

               let result = MailAlert(
                userMailID,
                Note,
                subject
                );
                    res.json({
                        status: true,
                        message: `Amount Debitted Successfully`,
                        data: result
                    });
                }
            }
        })
    } else {
        res.json({
            status: false,
            message: `Insufficient A/C Balance`,
        });
    }
}
module.exports = AmountWithdraw;