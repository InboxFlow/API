import nodemailer from "nodemailer";

type SendMailProps = {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
};

const user = process.env.NODEMAILER_MAIL;
const pass = process.env.NODEMAILER_PASS;

export async function sendMail(props: SendMailProps) {
  const {
    to,
    html = "<p>Hello</p>",
    text = "Mail text",
    subject = "Subject mail",
  } = props;

  const from = `Lucas DEV <${user}>`;
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter
    .sendMail({ from, to, subject, text, html })
    .catch((error) => console.log(error));
}
