import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [itemAmount, setItemAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const addToCart = (product, _id) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  const removeCart = (_id) => {
    const newCart = cart.filter((item) => {
      return item._id !== _id;
    });
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentitem) => {
        return accumulator + currentitem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const IncreaseAmount = (_id) => {
    const cartItem = cart.find((item) => item._id === _id);
    addToCart(cartItem, _id);
  };
  const DecreaseAmount = (_id) => {
    const cartItem = cart.find((item) => {
      return item._id === _id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item._id === _id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeCart(id);
    }
  };

  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentitem) => {
      return accumulator + currentitem.price * currentitem.amount;
    }, 0);
    setTotal(newTotal);
  });

  return <CartContext.Provider value={{ cart, addToCart, removeCart, IncreaseAmount, clearCart, DecreaseAmount, itemAmount, total }}>{children}</CartContext.Provider>;
};

export default CartProvider;
