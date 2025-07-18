import { createContext, useContext, useState } from "react";
import type { CartContextType, cartItem } from "../types/types";
import { products } from "../data/products";

// create a context for the cart

// eslint-disable-next-line react-refresh/only-export-components
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provide the context to the application
export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [cart, setCart] = useState<cartItem[]>([]);

  function addToCart(id: number) {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find((item) => item.ProductId === id);
      if (existingItem) {
        // If item exists, map through cart and increase quantity
        return prevCart.map((item) =>
          item.ProductId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add new item with quantity 1
        return [...prevCart, { ProductId: id, quantity: 1 }];
      }
    });
  }




  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.ProductId !== id));
  };
  // removeFromCart -> Filter out the item with the given id from the cart
  // This will remove the item from the cart



  const getProductQuantity = (id: number): number => {
    const item = cart.find((item) => item.ProductId === id);
    return item ? item.quantity : 0;
  };
  // getProductQuantity -> Find the item in the cart with the given id
  // If the item exists, return its quantity, otherwise return 0
  // This is used to check how many of a specific product is in the cart




  const getCartProducts = () => {
    // Step 1: Get all products that exist in cart
    const productsInCart = products.filter((product) => {
      // Check if this product exists in cart
      return cart.some((cartItem) => cartItem.ProductId === product.id);
    });
    // Step 2: Add quantities to these products
    const productsWithQuantities = productsInCart.map((product) => {
      // Find this product in cart to get its quantity
      const cartItem = cart.find((item) => item.ProductId === product.id);
      // Return product with its quantity
      return {
        ...product,
        quantity:cartItem!.quantity
      };
    });
    return productsWithQuantities;
  };
  const cartProducts = getCartProducts();

  // getCartProducts -> This function retrieves all products that are currently in the cart
  // It filters the products based on whether they exist in the cart and adds their quantities
  // to the product object, returning an array of products with their quantities


  return (
    <CartContext.Provider
      value={{
        cart,
        cartProducts,
        addToCart,
        removeFromCart,
        getProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
