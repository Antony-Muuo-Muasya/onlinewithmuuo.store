"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "@/data/products";
import { supabase, isSupabaseConfigured, mapDbProductToModel, mapModelToDbProduct } from "@/lib/supabase";

interface StoreContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  isOpenCheckout: boolean;
  activeProductForCheckout: Product | null;
  openCheckout: (product?: Product) => void;
  closeCheckout: () => void;
  checkoutStep: "idle" | "processing" | "success";
  startCheckoutSimulation: (paymentDetails: any) => Promise<boolean>;
  resetCheckout: () => void;
  products: Product[];
  uploadProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const [activeProductForCheckout, setActiveProductForCheckout] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "processing" | "success">("idle");

  // 1. Fetch dynamic products (from Supabase if configured, otherwise fallback to localStorage)
  useEffect(() => {
    const fetchCatalog = async () => {
      if (!isSupabaseConfigured) {
        // Fallback: merge static initial products with localstorage dynamic ones
        const savedProducts = localStorage.getItem("onlinewithmuuo_uploaded_products");
        if (savedProducts) {
          try {
            const uploaded: Product[] = JSON.parse(savedProducts);
            const merged = [...initialProducts];
            uploaded.forEach((prod) => {
              if (!merged.some((p) => p.id === prod.id)) {
                merged.push(prod);
              }
            });
            setProducts(merged);
          } catch (e) {
            console.error("Failed to parse local backup products", e);
          }
        }
        return;
      }

      // If Supabase is configured, fetch from active remote database
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map(mapDbProductToModel);
          setProducts(mapped);
        } else {
          // DATABASE AUTO-SEEDING:
          // If the products table is completely empty, populate it automatically!
          console.log("Supabase 'products' table is empty. Auto-seeding initial ebooks...");
          const dbReady = initialProducts.map(mapModelToDbProduct);
          const { error: seedError } = await supabase.from("products").insert(dbReady);
          
          if (!seedError) {
            console.log("Successfully seeded initial products in Supabase!");
          } else {
            console.error("Failed to seed initial products in Supabase:", seedError);
          }
        }
      } catch (err) {
        console.error("Supabase catalog fetch failed. Falling back to local storage:", err);
        // Fallback local storage
        const savedProducts = localStorage.getItem("onlinewithmuuo_uploaded_products");
        if (savedProducts) {
          try {
            const uploaded: Product[] = JSON.parse(savedProducts);
            const merged = [...initialProducts];
            uploaded.forEach((prod) => {
              if (!merged.some((p) => p.id === prod.id)) {
                merged.push(prod);
              }
            });
            setProducts(merged);
          } catch (e) {}
        }
      }
    };

    fetchCatalog();
  }, []);

  // 2. Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("onlinewithmuuo_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  const addToCart = (product: Product) => {
    if (cart.some((item) => item.id === product.id)) return;
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("onlinewithmuuo_cart", JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    localStorage.setItem("onlinewithmuuo_cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("onlinewithmuuo_cart");
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  const openCheckout = (product?: Product) => {
    if (product) {
      setActiveProductForCheckout(product);
    } else {
      setActiveProductForCheckout(null);
    }
    setIsOpenCheckout(true);
    setCheckoutStep("idle");
  };

  const closeCheckout = () => {
    setIsOpenCheckout(false);
    setActiveProductForCheckout(null);
    setCheckoutStep("idle");
  };

  const startCheckoutSimulation = async (paymentDetails: any) => {
    setCheckoutStep("processing");
    // Simulate API delay for Stripe validation & capture
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setCheckoutStep("success");
        // Clear cart if we did a full cart checkout or purchased an item in cart
        if (!activeProductForCheckout) {
          clearCart();
        } else {
          removeFromCart(activeProductForCheckout.id);
        }
        resolve(true);
      }, 2500);
    });
  };

  const resetCheckout = () => {
    setCheckoutStep("idle");
    setIsOpenCheckout(false);
    setActiveProductForCheckout(null);
  };

  // Upload dynamic product (optimistic UI update + remote Supabase upsert)
  const uploadProduct = async (newProduct: Product) => {
    // 1. Optimistic UI update
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex((p) => p.id === newProduct.id);
    if (index > -1) {
      updatedProducts[index] = newProduct;
    } else {
      updatedProducts.push(newProduct);
    }
    setProducts(updatedProducts);

    // 2. Local storage backup
    const customOnly = updatedProducts.filter(
      (p) => !initialProducts.some((init) => init.id === p.id)
    );
    localStorage.setItem("onlinewithmuuo_uploaded_products", JSON.stringify(customOnly));

    // 3. Remote Sync
    if (isSupabaseConfigured) {
      try {
        const dbReady = mapModelToDbProduct(newProduct);
        const { error } = await supabase
          .from("products")
          .upsert(dbReady, { onConflict: "id" });

        if (error) throw error;
        console.log(`Product '${newProduct.title}' successfully upserted to Supabase.`);
      } catch (err) {
        console.error("Failed to upsert product to Supabase database:", err);
      }
    }
  };

  // Delete product (optimistic UI update + remote Supabase deletion)
  const deleteProduct = async (productId: string) => {
    // 1. Optimistic UI update
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);

    // 2. Local storage backup
    const customOnly = updatedProducts.filter(
      (p) => !initialProducts.some((init) => init.id === p.id)
    );
    localStorage.setItem("onlinewithmuuo_uploaded_products", JSON.stringify(customOnly));

    // 3. Remote Sync
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", productId);

        if (error) throw error;
        console.log(`Product ID '${productId}' successfully deleted from Supabase.`);
      } catch (err) {
        console.error("Failed to delete product from Supabase database:", err);
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isOpenCheckout,
        activeProductForCheckout,
        openCheckout,
        closeCheckout,
        checkoutStep,
        startCheckoutSimulation,
        resetCheckout,
        products,
        uploadProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
