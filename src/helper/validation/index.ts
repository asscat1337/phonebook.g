import { string, z } from "zod";

export const PhonebookValidator = z.object({
  phone: z.string(),
  description: z.string(),
});

export const UsernameValidator = z.object({
  login: z.string(),
  password: z.string(),
});

export type UsernameType = z.infer<typeof PhonebookValidator>;
export type PhonebookType = z.infer<typeof UsernameValidator>;
