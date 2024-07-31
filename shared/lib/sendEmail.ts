import { Resend } from "resend";
import React from "react";

const resend = new Resend("re_bjGgTKfG_5FsVtm5Bw5mToBuyBa4qYPPr");

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
