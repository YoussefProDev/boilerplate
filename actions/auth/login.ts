"use server";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/auth/user";
import {
  generateVerificationToken,
  getVerificationTokenByEmail,
} from "@/lib/auth/verificationToken";
import { sendVerifacationEmail } from "@/lib/auth/email";
import { compare } from "bcryptjs";
export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  }
  if (!existingUser.password) {
    return { error: "Email already in use with different provider!" };
  }
  const existingToken = await getVerificationTokenByEmail(email);

  if (!existingUser.emailVerified && !existingToken) {
    const verifacationToken = await generateVerificationToken(
      existingUser.email
    );
    if (existingUser.name && existingUser.email && verifacationToken.token) {
      await sendVerifacationEmail({
        name: existingUser.name,
        email: existingUser.email,
        token: verifacationToken.token,
      });
    }

    return { success: "Confirmation email sent" };
  }
  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch) return { error: "Invalid Credentials" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error: ", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials from SIGN IN" };
        case "AccessDenied":
          return { error: "Email not verified" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Correct Credentials" };
};
