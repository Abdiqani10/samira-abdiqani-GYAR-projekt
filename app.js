const mail = 'peyton.gerhold@ethereal.email' // 
const pass = 'NHvRhr5syEQhUUje2Y'



const express = require('express')
const app = express()
const port = process.env.port || 5000;
const nodemailer = require('nodemailer')
const { response } = require('express');

const clientDir = __dirname + "\\"
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(clientDir))

app.post('/contact-form', async (req, res) => {
    
    let name = req.body.name
    let email = req.body.email
    //let subject = req.body.subject//
    let message = req.body.message

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: mail, // generated ethereal user
                pass: pass, // generated ethereal password
            }
        });
            await transporter.sendMail({
            from: `${name}, <${email}>`, // sender address
            to: 'webbituf@gmail.com', // list of receivers
            //ubject: `${subject}`, // Subject line
            text: `${message}`, // plain text body
        })

        res.redirect('/')
    })

app.listen(port, () => console.log(`Server app listening on port ${port}`))