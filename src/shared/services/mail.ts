import sgMail from "@sendgrid/mail";

type SendMailProps = {
  toMail: string;
  name: string;
  verify_url: string;
  contact_url: string;
};

export async function sendMail(props: SendMailProps) {
  const { toMail: to, name, verify_url, contact_url } = props;
  const from = "lucasgoncalvesgithub@gmail.com";
  const templateId = "d-b243a9ef7de4474bacc914146dd5c8e5";

  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
  const msg: sgMail.MailDataRequired = {
    to,
    from,
    templateId,
    dynamicTemplateData: { name, verify_url, contact_url },
  };

  await sgMail
    .send(msg)
    .then(() => {})
    .catch((error) => console.log("Error: " + error));
}
