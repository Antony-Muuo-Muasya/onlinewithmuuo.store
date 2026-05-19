import { createClient } from "@supabase/supabase-js";
import { Product } from "@/data/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials are fully configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing.\n" +
    "The storefront will gracefully run in Local persistent storage mode.\n" +
    "To enable Supabase, add these variables to your .env.local file."
  );
}

// Initialise the client (or create a dummy/noop client if not configured to avoid runtime crash)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

// Map database column names (snake_case) to Frontend Product Model (camelCase)
export function mapDbProductToModel(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
    snippet: dbProduct.snippet,
    description: dbProduct.description,
    price: Number(dbProduct.price),
    rating: Number(dbProduct.rating || 5.0),
    reviewsCount: Number(dbProduct.reviews_count || 1),
    coverImage: dbProduct.cover_image || "Emerald Cyber",
    pages: Number(dbProduct.pages || 0),
    fileSize: dbProduct.file_size || "0 MB",
    format: dbProduct.format || "PDF",
    publishedYear: dbProduct.published_year || new Date().getFullYear().toString(),
    features: Array.isArray(dbProduct.features) ? dbProduct.features : [],
    samplePages: Array.isArray(dbProduct.sample_pages) ? dbProduct.sample_pages : []
  };
}

// Map Frontend Product Model (camelCase) to Database column names (snake_case)
export function mapModelToDbProduct(product: Product) {
  return {
    id: product.id,
    title: product.title,
    snippet: product.snippet,
    description: product.description,
    price: product.price,
    rating: product.rating,
    reviews_count: product.reviewsCount,
    cover_image: product.coverImage,
    pages: product.pages,
    file_size: product.fileSize,
    format: product.format,
    published_year: product.publishedYear,
    features: product.features,
    sample_pages: product.samplePages
  };
}
