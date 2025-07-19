import { createContext, useContext, useEffect, useState } from "react";
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

   // Initialize cart state with localStorage data or empty array
  const [cart, setCart] = useState<cartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');          // Try to get saved cart
    return savedCart ? JSON.parse(savedCart) : [];          // Parse if exists, else empty
  });

  // Initialize cartTotal state with localStorage data or zero
  const [cartTotal, setCartTotal] = useState<number>(() => {
    const savedTotal = localStorage.getItem('cartTotal');    // Try to get saved total
    return savedTotal ? JSON.parse(savedTotal) : 0;         // Parse if exists, else 0
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));     // Persist cart data
  }, [cart]);

  // Calculate and update cart total whenever cart changes
  useEffect(() => {
    setCartTotal((() => {
      return cart.reduce((accumulator, item) => {
        const product = products.find((p) => p.id === item.ProductId); // Find product
        if (product) {
          return accumulator + product.price * item.quantity;  // Add to total
        }
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal)); // Save total
        return 0;                                             // Return 0 if product not found
      }, 0);
    })());
  }, [cart]);

  // cartTotal -> This state holds the total price of all items in the cart
  // It is calculated by multiplying the price of each product by its quantity in the cart
  // and summing these values up
  // It is updated whenever the cart changes


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



function removeFromCart(id: number) {
  setCart((prevCart: cartItem[]) =>
    prevCart.map((item) =>
        item.ProductId === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}
  // removeFromCart -> This function decreases the quantity of a specific item in the cart
  // If the quantity goes to zero, it removes the item from the cart
  // It maps through the cart, decreasing the quantity of the specified item
  // and filters out any items with a quantity of zero



  const getProductQuantity = (id: number): number => {
    const item = cart.find((item) => item.ProductId === id);
    return item ? item.quantity : 0;
  };
  // getProductQuantity -> Find the item in the cart with the given id
  // If the item exists, return its quantity, otherwise return 0
  // This is used to check how many of a specific product is in the cart


  const deleteFromCart=(id:number)=>{
    setCart((prevCart) => prevCart.filter((item) => item.ProductId !== id));
  }
  // deleteFromCart -> This function removes a specific item from the cart
  // It filters the cart to exclude the item with the specified id
  // This is used when the user wants to completely remove an item from the cart



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


  // Clear entire cart and remove from localStorage
  const clearCart = () => {
  setCart([]);
  setCartTotal(0);
  localStorage.removeItem('cart');
  localStorage.removeItem('cartTotal');
};

  return (
    <CartContext.Provider
      value={{
        cart,
        cartProducts,
        addToCart,
        clearCart,
        removeFromCart,
        getProductQuantity,
        deleteFromCart,
        cartTotal,
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
