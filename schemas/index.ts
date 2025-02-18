import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, { message: "password must be greater then 6" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "password must be greater then 6" }),
});
