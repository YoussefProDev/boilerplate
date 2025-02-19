import ConfirmationEmailTemplate from "@/components/email/ConfirmationEmailTemplate";
import PasswordResetTemplate from "@/components/email/PasswordResetTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerifacationEmail = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Auth <confirmation@youssefprodev.com>",
    to: email,
    subject: "Confirmation Link",
    react: ConfirmationEmailTemplate({ name, token }),
  });

  if (error) {
    return {};
  }
};

export const sendPasswordResetEmail = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  const { data, error } = await resend.emails.send({
    from: "Password <Reset@youssefprodev.com>",
    to: email,
    subject: "Reset Password",
    react: PasswordResetTemplate({ name, token }),
  });

  if (error) {
    return {};
  }
};
