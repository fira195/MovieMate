import nodeMailer from 'nodemailer'
const transport = nodeMailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        //having problems with the variables works with hardcoding though
        user: process.env.EMAIL_SENDER,
        pass: process.env.GOOGLE_APP_PASSWORD
    },
})

export const sendEmail=(mailOptions)=>{
    console.log(process.env.EMAIL_SENDER, process.env.GOOGLE_APP_PASSWORD)
    transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info?.response);
    }
  })}
 