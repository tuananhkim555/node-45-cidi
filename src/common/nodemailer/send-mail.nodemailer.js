import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "tuananhkim555@gmail.com",
    pass: "lblfwsiqejjtemko",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async () => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'tuananhkim555@gmail.com', // sender address
    to: "tuananhkim1510@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Chào mừng bạn đến với ALIGO MEDIA", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


