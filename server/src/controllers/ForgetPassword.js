const DBConn = require('../database/DBConn');
const MailAlert = require('../mail/MailAlert');
const ForgetPassword = (req, res, next) => {
    const { newPassword, userMailID, userName } = req.body;
    const querry = `UPDATE users SET userPassword = ? WHERE userID = '${req.params.userID}' AND userMailID = ?`;

    DBConn.query(querry, [ newPassword, userMailID, userName ], (err, rows, field) => {
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
                <p class="lead">May the next chapter of your journey be filled with prosperity and success..</br>
                <p> Thanks for being a part of our Organization.</p></br>
                <hr class="my-4">
                <p><h3>Thanks<br>Team Apna Bank</h3></p>
               </body>
               </html>`;

               const subject = `Password Updated, ${userName}`;

               let result = MailAlert(
                userMailID,
                Note,
                subject
                );

                res.json({
                    status: true,
                    data: result,
                    message: `${userName} Password Updated Successfully!!`
                });
            } else {
                res.json({
                    status: false,
                    message: `Password Updation FAILED!!`,
                });
            }
            }
    });
}

module.exports = ForgetPassword;