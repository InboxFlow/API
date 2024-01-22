import nodemailer from "nodemailer";

type SendMailProps = {
  toMail: string;
  name: string;
  verify_url: string;
  contact_url: string;
};

const user = process.env.NODEMAILER_MAIL;
const pass = process.env.NODEMAILER_PASS;

export async function sendMail(props: SendMailProps) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter
    .sendMail({
      from: `Lucas DEV <${user}>`,
      to: props.toMail,
      subject: "Verify your email",
      text: `Hello ${props.name}`,
      html: "<p>Hello</p>",
    })
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.log(error));
}
