import React, { useContext } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

import { CartContext } from '../contexts/CartContext';

import { Link } from 'react-router-dom';
import CartItem from '../fragment/cartitem';
import Header from '../fragment/Header';
import { DarkMode } from '../contexts/DarkModeContext';

const CartPage = () => {
  const { cart, clearCart, clearUserCart, total, itemAmount, user } = useContext(CartContext);
  const { isDarkMode } = useContext(DarkMode);
  const handleCheckout = () => {
    console.log('User Info:', user);
  };

  return (
    <>
      <Header />
      <div className={`${isDarkMode && 'bg-slate-900 text-white transition duration-300'}`}>
        <div className="w-[80%] items-center mx-auto ">
          <div className="flex items-center justify-between py-6 border-b mt-[80px] ">
            <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount}) </div>
          </div>
          <div className="flex flex-col gap-y-2 h-[520px] overflow-y-auto overflow-x-hidden lg:h-[550px] border-b">
            {cart.map((item) => {
              return <CartItem key={item._id} item={item} />;
            })}
          </div>
          <div className=" flex flex-col gap-y-3 py-4 mt-4 ">
            <div className=" flex w-full justify-between items-center">
              <div className="uppercase font-semibold">
                <span className="mr-2">Total : </span> Rp {parseFloat(total).toFixed(2)}{' '}
              </div>
              <div onClick={clearUserCart} className="cursor-pointer hover:bg-red-800 transition duration-300 py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl">
                <FiTrash2 />{' '}
              </div>
            </div>

            <Link to="/checkout" className="bg-blue-700 flex p-4 justify-center  items-center text-white w-[50%] mx-auto cursor-pointer rounded rounded-lg hover:bg-gray-500 transition duration-300   font-medium" onClick={handleCheckout}>
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
