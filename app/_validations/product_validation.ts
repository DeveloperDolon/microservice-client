import { z } from "zod";

export const product_validation = z.object({
    name: z.string().min(1, "Product name is required"),
    images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
    discount: z.number().optional(),
    price: z.number().min(1, "Price is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    discount_type: z.enum(["percentage", "amount"]).default('percentage'),
    ingredients: z.array(z.string()).optional(),
    shipping_cost: z.number(),
    benefit: z.string().optional(),
    seller_id: z.string().min(1, "Seller is required"),
    likes: z.number().optional(),
    brand_id: z.string().min(1, "Brand is required"),
}); 

export type ProductValidationType = z.infer<typeof product_validation>;