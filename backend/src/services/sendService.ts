// import { registrationEmail } from "@/emailTemplate/registrationEmail";
// import { registrationEmailAdmin } from "@/emailTemplate/registrationEmailAdmin";
// import { sendMail } from "@/lib/nodemailer";
// import { RegisterResponseT } from "@/types";

import { sendMail } from "@/lib/nodemailer";

class SendService {
  public static async sendEmailToSellerByBuyer(toEmail: string | string[]) {
    const subject = "Welcome";
    const html = `<p>Welcome to our site!</p>`;
    const send = await sendMail({ toEmail, subject, html });
    return send;
  }
  // public static async sendRegistrationEmail(
  //   toEmail: string | string[],
  //   data: RegisterResponseT,
  // ) {
  //   const subject = `Thank You for Registering 🎉`;
  //   const html = registrationEmail(data);
  //   const send = await sendMail({ toEmail, subject, html });
  //   return send;
  // }
  // public static async sendRegistrationEmailToAdmin(
  //   toEmail: string | string[],
  //   data: RegisterResponseT,
  // ) {
  //   const subject = `New Registration Alert`;
  //   const html = registrationEmailAdmin(data);
  //   const send = await sendMail({ toEmail, subject, html });
  //   return send;
  // }
}

export default SendService;
