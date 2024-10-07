import { verificationEmailTemplate } from "./template/email-verification";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendMail({
  email,
  username,
  verifToken,
}: {
  email: string;
  username: string;
  verifToken: string;
}) {
  const transport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.PASSWORD_MAIL,
    },
  });

  const mailOptions: Mail.Options = {
    from: "Open Market - No Reply <noreply@openmarket.com>",
    to: email,

    subject: "Open Market - Email Verification",
    html: await verificationEmailTemplate({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/verify?token=${verifToken}`,
      username: username,
    }),
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  // await transport.sendMail(mailOptions);

  try {
    await sendMailPromise();
  } catch (err) {
    throw new Error("Fail send email");
  }
}
