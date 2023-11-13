import React, { useContext, useState } from 'react';
// import { ProductContext } from '../contexts/ProductContext';

import Product from '../fragment/cardProduct/CardProduct';
import Hero from '../fragment/Hero';
import { DarkMode } from '../contexts/DarkModeContext';
import Header from '../fragment/Header';
import Footer from '../fragment/Footer';
import DrinkCategory from '../fragment/cardProduct/DrinkCategory';
import FoodCategory from '../fragment/cardProduct/FoodCategory';
import CamilanCategory from '../fragment/cardProduct/CamilanCategory';

const Home = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  const [search, setSearch] = useState('');
  const [showType, setShowType] = useState('all');

  return (
    <div>
      <Header />
      <Hero />
      <section className={`py-16 ${isDarkMode && 'bg-slate-900 text-white transition'}`}>
        <div className="container mx-auto">
          <div className="  ">
            <button className="absolute right-2 top-2 bg-blue-600 p-2 text-white rounded mt-20 mr-2" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="text-black  w-[60%] mb-[50px] justify-center flex  mx-auto px-5 py-5 rounded rounded-[20px] border border-blue-200 hover:border-blue-500 transition duration-300 "
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />{' '}
            <div className="grid  md:grid-cols-4 grid-cols-2 mx-auto w-[40%] mb-8 ">
              <button className="bg-sky-400 w-[80%] p-2 rounded rounded-[20px] hover:bg-sky-800 hover:text-white transition mx-auto duration-200 w-[50%]" onClick={() => setShowType('all')}>
                All
              </button>
              <button className="bg-sky-400 w-[80%] p-2 rounded rounded-[20px] hover:bg-sky-800 hover:text-white transition mx-auto duration-200 w-[50%]" onClick={() => setShowType('drink')}>
                Drink
              </button>
              <button className="bg-sky-400 w-[80%] p-2 rounded rounded-[20px] hover:bg-sky-800 hover:text-white transition mx-auto duration-200 w-[50%]" onClick={() => setShowType('food')}>
                Food
              </button>
              <button className="bg-sky-400 w-[80%] p-2 rounded rounded-[20px] hover:bg-sky-800 hover:text-white transition mx-auto duration-200 w-[50%]" onClick={() => setShowType('camilan')}>
                Camilan
              </button>
            </div>
            {(showType === 'all' && <Product search={search} className="mb-5" />) ||
              (showType === 'drink' && <DrinkCategory search={search} />) ||
              (showType === 'food' && <FoodCategory search={search} />) ||
              (showType === 'camilan' && <CamilanCategory search={search} />)}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
