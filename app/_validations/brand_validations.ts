import { z } from "zod";

const create_brand_validation = z.object({
  name: z.string().min(3, "Brand name must be minimum 3 character!"),
  banner: z.instanceof(File).optional(),
  logo: z.instanceof(File),
  title: z.string().min(5, "Title must be minimum 5 character!"),
  description: z.string().optional(),
  location: z.string().optional(),
});

export default create_brand_validation;