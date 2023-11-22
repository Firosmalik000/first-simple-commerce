import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [itemAmount, setItemAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // const [detailCart, setDetailCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const response = await axios.get(`http://localhost:5000/api/cart/user/${userId}`);

        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, [cart]);

  const saveCartToLocalStorage = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = async (product, _id) => {
    const cartItem = cart.find((item) => item._id === _id);

    if (cartItem) {
      increaseAmount(_id);
    } else {
      const userId = localStorage.getItem('userId');
      const newItem = { ...product, amount: 1, userId };

      try {
        const response = await axios.post('http://localhost:5000/api/cart', {
          name: newItem.name,
          amount: newItem.amount,
          price: newItem.price,
          description: newItem.description,
          user: newItem.userId,
          image_url: newItem.image_url,
          product: newItem._id,
        });

        if (response.status === 201) {
          setCart((prevCart) => [...prevCart, newItem]);
          saveCartToLocalStorage([...cart, newItem]);
        } else {
          console.error('Error adding to cart:', response.data);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const removeCart = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:5000/api/cart/user/${userId}/${_id}`); // Perbaiki URL API

      if (response.status === 200) {
        const newCart = cart.filter((item) => item._id !== _id);
        setCart(newCart);
        saveCartToLocalStorage(newCart);
      } else {
        console.error('Error removing from cart:', response.data);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearUserCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:5000/api/cart/user/${userId}`);

      if (response.status === 200) {
        setCart([]);
        saveCartToLocalStorage([]);
        enqueueSnackbar('Cart cleared successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Gagal Menghapus Cart', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error clearing user cart:', error);
    }
  };

  const increaseAmount = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.patch(`http://localhost:5000/api/cart/user/${userId}/${_id}/increase`);

      if (response.status === 200) {
        const updatedCart = cart.map((item) => (item._id === _id ? { ...item, amount: item.amount + 1 } : item));
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
      } else {
        console.error('Error increasing amount:', response.data);
      }
    } catch (error) {
      console.error('Error increasing amount:', error);
    }
  };

  const decreaseAmount = async (_id) => {
    try {
      const userId = localStorage.getItem('userId');
      const cartItem = cart.find((item) => item._id === _id);

      if (cartItem) {
        const newCart = cart.map((item) => (item._id === _id ? { ...item, amount: item.amount - 1 } : item));
        const response = await axios.patch(`http://localhost:5000/api/cart/user/${userId}/${_id}/decrease`);

        if (response.status === 200) {
          if (cartItem.amount < 1) {
            removeCart(_id);
          }
        } else {
          console.error('Error decreasing item amount:', response.data);
        }
        setCart(newCart);
        saveCartToLocalStorage(newCart);
      }
    } catch (error) {
      console.error('Error decreasing item amount:', error);
    }
  };


  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => accumulator + currentItem.amount, 0);
    setItemAmount(amount);
  }, [cart]);

  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount, 0);
    setTotal(newTotal);
  }, [cart]);

  return <CartContext.Provider value={{ cart, addToCart, removeCart, increaseAmount, decreaseAmount, itemAmount, total, clearUserCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
