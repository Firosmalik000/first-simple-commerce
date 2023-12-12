import React, { useContext, useEffect, useState } from 'react';

import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import { AiOutlineLogin, AiOutlineShoppingCart } from 'react-icons/ai';
import AuthContext from '../contexts/AuthContext';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';

const Header = () => {
  const [isActive, setIsActive] = useState(true);

  const { itemAmount } = useContext(CartContext);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  const username = localStorage.getItem('name');

  return (
    <header className={` bg-gradient-to-b from-red-600 via-30 to-orange-500  py-4 shadow-md text-white   fixed w-full z-20 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={'/'}>
          <div>
            <MdOutlineShoppingBag className="text-white text-4xl" />
          </div>
        </Link>{' '}
        {loggedIn === false ? (
          <Link to={'/login'}>
            <div className="cursor-pointer grid md:grid-cols-2 ">
              <AiOutlineLogin className="text-2xl" />
              <p>Login</p>
            </div>
          </Link>
        ) : (
          <Link to={'/profile'}>
            {' '}
            <button className="   text-white hover:text-gray-200 font-bold capitalize font-xl rounded-lg   transition duration-300 px-4 py-2">{username}</button>
          </Link>
        )}
        <Link to={'/cart'} className="hover:bg-blue-500 hover:text-white transition duration-300  p-2 rounded-full">
          <div className="cursor-pointer flex relative ">
            <AiOutlineShoppingCart className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] text-white rounded-full flex justify-center items-center">{itemAmount} </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
