const DBConn = require('../database/DBConn');
const MailAlert = require('../mail/MailAlert');
const AmountDeposit = (req, res, next) => {
    const querry = `UPDATE users SET acBalance = (acBalance + ?) WHERE userID = '${req.params.userID}'`;
    const { amount, userMailID, userName, acBalance } = req.body;

    DBConn.query(querry, [ amount, userMailID, userName, acBalance ], (err, rows, fields) => {
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
                <p class="lead">Your A/C got Creditted with Rs. '${amount}'.</br>
                <p>Available Balance in your A/C: <b>'${acBalance + amount}'</b></p></br>
                <hr class="my-4">
                <p><h3>Thanks<br>Team Apna Bank</h3></p>
               </body>
               </html>`;

               const subject = `Amount Creditted`;

               let result = MailAlert(
                userMailID,
                Note,
                subject
                );

                res.json({
                    status: true,
                    data: result,
                    message: `Dear ${userName}, Your A/C got Creditted with Rs. '${amount}'.`
                });
            } else {
                res.json({
                    status: false,
                    message: `Operation Failed!!`,
                });
            }
        }
    });
    
}

module.exports = AmountDeposit;