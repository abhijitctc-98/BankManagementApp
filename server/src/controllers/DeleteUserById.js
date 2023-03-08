const DBConn = require('../database/DBConn');
const MailAlert = require('../mail/MailAlert')
const DeleteUserById = (req, res, next) => {
    const { userMailID, userName } = req.body;
    const querry = `DELETE from users WHERE userID = ${req.params.userID}`;

    DBConn.query(querry, (err, rows, fields) => {
        if (err) {
            res.json({
                status: false,
                message: `USER DELETION FAILED!!`,
            });
        } else {
            console.log("Rows:\t"+rows);
            if (rows.affectedRows > 0) {
                // let mailOption = {
                //     from: process.env.from,
                //     to: userMailID,
                //     subject: 'Hasta la vista, My Friend!!',
                //     html: `<h2 style="color:#ff6600;">May the next chapter of your journey be filled with prosperity and success.</h2>
                //     <p style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">May the memories of our time together be as beautiful and enduring as the cherry blossoms of spring.</p>`
                // }

                // transporter.sendMail(mailOption, (err, info) => {
                //     if (err) {
                //         console.log(err.stack);
                //     } else {
                //         res.json({
                //             status: true,
                //             message: `User Deleted Successfully!!`
                //         });
                //     }
                // });
                const Note = `<html>
                <body>
                <h3> Dear ${userName},</h3>
                <p class="lead">May the next chapter of your journey be filled with prosperity and success..</br>
                <p> Thanks for being a part of our Organization.</p></br>
                <hr class="my-4">
                <p><h3>Thanks<br>Team Apna Bank</h3></p>
               </body>
               </html>`;

               const subject = `Hasta la vista, ${userName}`;

               let result = MailAlert(
                userMailID,
                Note,
                subject
                );

                res.json({
                    status: true,
                    data: result,
                    message: `${userName} Deleted Successfully!!`
                });
            } else {
                res.json({
                    status: false,
                    message: `USER DELETION FAILED!!`,
                });
            }
        }
    });
}
module.exports = DeleteUserById;