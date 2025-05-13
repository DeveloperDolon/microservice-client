export type ProductType = {
  id?: string;
  name: string;
  images: string;
  discount?: number;
  price: number;
  description: string;
  discount_type?: "percentage" | "amount";
  ingredients?: string[];
  shipping_cost: number;
  benefit?: string;
  seller_id: string;
  likes?: number;
  brand_id: string;
  variants?: {
    name: string;
    stock: number;
    price: number;
  }[];
};
