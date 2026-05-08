export interface Product {
  id: string;
  slug: string;
  name: string;
  hook: string;
  description: string;
  material: string;
  dimensions: string;
  price: number;
  image_url: string;
  images: string[];
  extras: string | null;
  sold: boolean;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WaitlistEntry {
  email: string;
  created_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  customer_email: string;
  customer_name: string;
  status: "pending" | "approved" | "rejected";
  payment_id: string | null;
  total: number;
  created_at: string;
}
