const DBConn = require('../database/DBConn');
const MailAlert = require('../mail/MailAlert');
const AddUser = (req, res, next) => {
    const { userName, userPassword, userMailID } = req.body;
    const acBalance = 0.0;
        const querry = `INSERT INTO users (userName, userPassword, userMailID, acBalance) values (?,?,?,?)`;

        DBConn.query(querry, [ userName, userPassword, userMailID, acBalance ], (err, rows, fields) => {
            if (err) {
                res.json({
                    status: false,
                    message: err.stack,
                });
            } else {
                console.log(rows);
    
                // let mailOption = {
                //     from: process.env.from,
                //     to: userMailID,
                //     subject: 'Registration Successfull!!',
                //     html: `<h2 style="color:#ff6600;">WELCOME TO WORLD OF ENDLESS POSSIBILITIES</h2>
                //     <p style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Thanks for Joining our community, Your Registration is Successfull with this Mail</p>
                //     <a href='https://www.youtube.com/channel/UCV8ICODpwqKeZO_7moDm-_A'><p style="font-family: Verdana, Geneva, Tahoma, sans-serif;">Dive into a New World of Endless Possibilities</p></a>`
                // }
                if (rows.affectedRows > 0) {
                    // res.json({
                    //     status: true,
                    //     message: `User Registration Successfull!!`,
                    // });

                    const Note = `<html>
                    <body>
                    <h3> Dear ${userName},</h3>
                    <p class="lead">Welcome to the world of endless possibilities.</br>
                    <p> If you have any further questions or concerns, please do not hesitate to reach out to us.</p></br>
                    <hr class="my-4">
                    <p><h3>Thanks<br>Team Apna Bank</h3></p>
                   </body>
                   </html>`;

                   const subject = `WELCOME TO THE FAMILY ${userName}`
              
                    let result = MailAlert(
                        userMailID,
                        Note,
                        subject
                    );

                    res.json({
                        status: true,
                        data: result,
                        message: `User Registered Successfully!!`
                    })

                    // transporter.sendMail(mailOption, (err, info) => {
                    //     if (err) {
                    //         console.log('Failed to Send the Mail!!');
                    //     } else {
                    //         res.json({
                    //             status: true,
                    //             message: `User Registration Successfull!!`,
                    //         });
                    //     }
                    // })
                } else {
                    res.json({
                        status: false,
                        message: `Registration Failed!!`,
                    });
                }
            }
       });

}
module.exports = AddUser;