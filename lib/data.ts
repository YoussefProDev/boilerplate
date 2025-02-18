import { db } from "@/lib/db";

//User
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
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

//VerifacationToken
export const getVerifacationTokenByEmail = async (email: string) => {
  try {
    const verifacationToken = await db.verifactationToken.findFirst({
      where: {
        email,
      },
    });
    return verifacationToken;
  } catch (error) {
    return null;
  }
};

//VerifacationToken
export const getVerifacationTokenByToken = async (token: string) => {
  try {
    const verifacationToken = await db.verifactationToken.findFirst({
      where: {
        token,
      },
    });
    return verifacationToken;
  } catch (error) {
    return null;
  }
};
//PasswordResetToken
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

//VerifacationToken
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
