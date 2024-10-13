import nodeMailer from 'nodemailer'
import { CustomError } from './customError.js'
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
      throw new CustomError(error)
    } else {
      console.log('Email sent: ' + info?.response);
    }
  })}
 