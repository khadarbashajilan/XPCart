import { createContext, useContext, useState } from "react";
import type { CartContextType, cartItem } from "../types/types";



// create a context for the cart

// eslint-disable-next-line react-refresh/only-export-components
const CartContext = createContext<CartContextType | undefined>(undefined);


// Provide the context to the application

export default function CartProvider({ children }: { children: React.ReactNode }) {

    const [cart, setCart] = useState<cartItem[]>([]);
    
    function addToCart(id: number) {
        setCart(
            cart.some((item)=> item.ProductId === id)
            ? cart.map((item)=>
            item.ProductId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        :[...cart, { ProductId: id, quantity: 1 }]
        )
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.ProductId !== id));
    };
    
    const getProductQuantity = (id: number): number => {
        const item = cart.find((item) => item.ProductId === id);
        return item ? item.quantity : 0;
    };
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getProductQuantity }}>
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