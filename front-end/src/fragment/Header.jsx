import React, { useContext, useEffect, useState } from 'react';

import { BsBag } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';
import { AiOutlineLogin } from 'react-icons/ai';
import AuthContext from '../contexts/AuthContext';
import { FaRegUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isActive, setIsActive] = useState(true);

  const { itemAmount } = useContext(CartContext);
  const { loggedIn, getLoggedIn, user } = useContext(AuthContext);
  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-20 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={'/'}>
          <div>
            <img className="w-[40px]" src={Logo} />
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
            <button className="  rounded text-black hover:text-white rounded-lg hover:bg-sky-600  transition duration-300 px-4 py-2">{user.name}</button>
          </Link>
        )}
        <Link to={'/cart'}>
          <div className="cursor-pointer flex relative ">
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] text-white rounded-full flex justify-center items-center">{itemAmount} </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
