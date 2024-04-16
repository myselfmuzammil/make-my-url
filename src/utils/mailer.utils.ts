import nodemailer, {SendMailOptions} from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "lawson20@ethereal.email",
    pass: "x5BP789ZgUcdBuaZPN",
  },
});

export async function sendMail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, "Error sending email");
      return;
    }

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}
