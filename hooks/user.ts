import { auth } from "@/auth";
import { LOGIN_PAGE } from "@/route";
import { redirect } from "next/navigation";

export async function requireUserSession() {
  const session = await auth();

  if (!session?.user) {
    redirect(LOGIN_PAGE);
  }

  return session.user;
}
