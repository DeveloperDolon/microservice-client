import { z } from "zod";

const user_create_validation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string().optional(),
  role_id: z.string(),
  profile_picture: z.instanceof(File).optional(),
});

export default user_create_validation;
