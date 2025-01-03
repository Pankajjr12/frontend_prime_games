import { Seller } from "./sellerTypes";
// Sample of ProductState might look like this
interface ProductState {
  data: Product[];  // Array of products inside `data`
  loading: boolean;
  error: string | null;
}


export interface Category {
    id?: number; // Optional since id is auto-generated
    name: string;
    categoryId: string;
    parentCategory?: Category; // Optional since a category might not have a parent
    level: number;
  }

export interface Product {
    id?: number; // Optional since id is auto-generated
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent?: number;
    quantity?: number;
    brand: string;
    images: any[]; // Array of strings for image URLs
    numRatings?: number;
    category?: Category; // Optional since a product might not have a category assigned yet
    seller?: Seller; // Placeholder for Seller interface (assuming it exists)
    createdAt?: Date; // Assuming LocalDateTime can be mapped to Date
    years: string; // Array of strings for product sizes
    in_stock?: boolean; //
  }