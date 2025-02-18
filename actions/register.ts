"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";

import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/data";
import { generateVerifacationToken } from "@/lib/tokens";
import { sendVerifacationEmail } from "@/lib/email";

export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email Already In Use" };
  }
  const hashedPassword = await hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verifacationToken = await generateVerifacationToken(email);
  const token = verifacationToken.token;

  await sendVerifacationEmail({ name, email, token });
  return { success: "Confirm Email Sent!" };
};
