
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string | null;
  short_description: string;
  long_description: string;
  capacity: string;
  capacity_options: string[];
  specs: ProductSpec[];
  image_url: string;
  featured: boolean;
  display_order: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  capacityOption: string;
};

export type OrderPayload = {
  customer_name: string;
  company?: string;
  email: string;
  phone: string;
  address?: string;
  items: { name: string; quantity: number; capacity: string }[];
  total_amount: number;
  notes?: string;
};
