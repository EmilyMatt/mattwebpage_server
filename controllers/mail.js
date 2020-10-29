const nodemailer = require('nodemailer')
let transporter

const initMailer = async () => {
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "saturn.game.studios@gmail.com",
                pass: "Emily~Matt1996"
            }
        })
    
}

const sendMail = async (mail, ver) => {
    let info = await transporter.sendMail({
        from: 'saturn.game.studios@gmail.com',
        to: mail,
        subject: "Your Verification Code",
        text: `We thank you for choosing Saturn for your game experience. 
                We hope you enjoy our time together
                Please click on the link or copy it to the address bar to verify your account: 
                http://mattwebpage.com/verify/` + ver,
        html: " <h2 style='text-align: center;'>We thank you for choosing Saturn for your game experience.</h2><br<h3>We hope you enjoy our time together</h3><br><p>Please click on the link or copy it to the address bar to verify your account:</p><br<a href='http://mattwebpage.com/verify/"+ver+"' target='_blank'>http://mattwebpage.com/verify/"+ver+"</a>",
    })

    console.log("mail sent to: "+mail)
}

module.exports = {
    initMailer,
    sendMail
}