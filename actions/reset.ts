"use server";

import { generatePasswordResetToken } from "@/lib/PasswordToken";
import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
  getUserByEmail,
} from "@/lib/data";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { ResetSchema, newPasswordSchema } from "@/schemas";
import { hash, compare } from "bcryptjs";
import { z } from "zod";

export const sendReset = async (formData: z.infer<typeof ResetSchema>) => {
  const validateData = ResetSchema.safeParse(formData);

  if (!validateData.success) return { error: "Invalid Email!" };

  const { email } = validateData.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email Not Found" };

  const exsistingToken = await getPasswordResetTokenByEmail(email);

  if (exsistingToken && new Date(exsistingToken.expires) < new Date())
    return { error: "Reset Link was Send" };
  const token = (await generatePasswordResetToken(email)).token;
  const { name } = existingUser;
  if (name && token) await sendPasswordResetEmail({ name, email, token });
  return { success: "Reset Email Sent!" };
};

export const newPassword = async (
  token: string,
  formData: z.infer<typeof newPasswordSchema>
) => {
  const validateData = newPasswordSchema.safeParse(formData);

  if (!validateData.success) return { error: "Invalid Field!" };

  const exsistingToken = await getPasswordResetTokenByToken(token);

  if (!exsistingToken) return { error: "Link Non Valid" };

  const hasExpired = new Date(exsistingToken.expires) < new Date();
  if (hasExpired) return { error: "Link Has Expired" };

  const existingUser = await getUserByEmail(exsistingToken.email);

  if (!existingUser) return { error: "User Not Found" };
  const { password } = validateData.data;
  if (!existingUser.password)
    return { error: "Email already in use with different provider!" };

  const hashedPassword = await hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  await db.passwordResetToken.delete({
    where: {
      id: exsistingToken.id,
    },
  });

  return { success: "Password Changed" };
};
