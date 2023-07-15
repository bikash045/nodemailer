require("dotenv").config();
const http = require("http");
const nodemailer = require("nodemailer");
const fs= require("fs");
const email = (message,response)=>{
    const auth = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass:process.env.EMAIL_PWD
        }
    });
    const reciept = {
        form: "vermabikash@gmail.com",
        to: "vermabikash4@gmail.com",
        subject: "verfication code",
        html:message,
      attachments:[

        {
            filename:"demo.gpg",
            content:fs.createReadStream("assets/test.jpg")
        },
        {
            filename:"test.pdf",
            content:fs.createReadStream("assets/notes.pdf")
        }
      ]
    };
    auth.sendMail(reciept, (error, emailRes) => {
        if (error)
            throw error;
        console.log("success !");
        response.end();
    });
}
const server = http.createServer((request, response) => {
    fs.readFile("template.html", (error,message)=>{
        email(message,response)
    });
 
});
server.listen(8080);

//cbgfppzpfjphhwec