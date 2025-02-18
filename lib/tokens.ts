import { v4 as uuidv4 } from "uuid";
import { getVerifacationTokenByEmail } from "./data";
import { db } from "./db";

export const generateVerifacationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerifacationTokenByEmail(email);

  if (existingToken) {
    await db.verifactationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verifacationToken = await db.verifactationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verifacationToken;
};
