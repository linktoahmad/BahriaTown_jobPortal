const express = require("express");
const router = express.Router();
const nodemailer =require("nodemailer");


router.post("/sendmail", async (req,res)=>{ 

  var transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'ahmedk9199@gmail.com',
        pass: '69jklol420'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  },
});
let message;
req.body.jobTitle?(message=`<h1>Dear ${req.body.name} \nyou applied for the job post of ${req.body.jobTitle} </h1>`):(message=`<h1>welcome ${req.body.name} you have been registered successfully</h1>`)
const mailOptions = {
    from: 'ahmedk91991@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome to Career Portal', // Subject line
    html: message// plain text body
};

 transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        res.send(err)
    else
    res.send(info)
})

})

module.exports = router;
