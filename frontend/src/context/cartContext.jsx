import React, { createContext, useContext, useState, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: cartItem.price * (cartItem.quantity + 1),
              }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...item, quantity: 1, totalPrice: item.price },
      ]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price * (item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
