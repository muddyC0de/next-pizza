import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  template: string
) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "next.pizza.dev@gmail.com",
      pass: "vwuy fraq kqrx zbtq",
    },
  });

  try {
    const result = await transport.verify();
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: "next.pizza.dev@gmail.com",
      to,
      subject,
      html: template,
    });
  } catch (error) {
    console.log(error);
  }
};
