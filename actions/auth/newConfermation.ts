"use server";

import { getUserByEmail } from "@/lib/auth/user";
import { getVerificationTokenByToken } from "@/lib/auth/verificationToken";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const exsistingToken = await getVerificationTokenByToken(token);
  // console.log("token: ", token);

  if (!exsistingToken) return { error: "Token Does Not Exist" };
  const hasExpired = new Date(exsistingToken.expires) < new Date();
  if (hasExpired) return { error: "Token Has Expired" };
  const { email } = exsistingToken;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email Does Not Exist!" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: exsistingToken.email,
    },
  });
  await db.verificationToken.delete({
    where: {
      id: exsistingToken.id,
    },
  });
  return { success: "Email Verified!" };
};
