import React, { createContext, useContext, useState } from "react";

// Create the CartContext
const CartContext = createContext();

// CartProvider to provide the cart state and functions to the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add an item to the cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.price * (cartItem.quantity + 1) }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1, totalPrice: item.price }]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
