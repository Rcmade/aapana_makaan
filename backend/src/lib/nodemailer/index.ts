import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (mailOptions: {
  subject: string;
  toEmail: string[] | string;
  html: string;
}): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      { ...mailOptions, to: mailOptions.toEmail, from: process.env.EMAIL_FROM },
      function (error: any, info: any) {
        if (error) {
          console.log("Email Send Error ", error);
          reject(false);
        } else {
          // console.log("Email Send Info ", info);
          resolve(true);
        }
      },
    );
  });
};

export default transporter;
