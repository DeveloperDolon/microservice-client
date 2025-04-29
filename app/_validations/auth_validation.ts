import { z } from "zod";

export const auth_login_validation = z.object({
  email: z.string().email("Invalid email address!"),
  password: z.string().min(8, "Password must be 8 character!"),
});

export type LoginValidationType = z.infer<typeof auth_login_validation>;