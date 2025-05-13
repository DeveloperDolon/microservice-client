import { z } from "zod";

export const product_validation_schema = z.object({
  name: z.string().min(1, "Product name is required"),
  images: z.array(z.instanceof(File)),
  discount: z.number().optional(),
  price: z.number().min(1, "Price is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  discount_type: z.enum(["percentage", "amount"]),
  ingredients: z.array(z.string()).optional(),
  shipping_cost: z.number(),
  benefit: z.string().optional(),
  likes: z.number().optional(),
  brand_id: z.string().min(1, "Brand is required"),
  variants: z
    .array(
      z.object({
        name: z.string(),
        stock: z.number(),
        price: z.number(),
      })
    )
    .optional(),
});

export type ProductValidationType = z.infer<typeof product_validation_schema>;
