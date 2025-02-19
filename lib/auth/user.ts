import "server-only";
import { db } from "@/lib/db";
import { LOGIN_PAGE } from "@/route";
import { redirect } from "next/navigation";

//User
export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) redirect(LOGIN_PAGE);
  return user;
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
