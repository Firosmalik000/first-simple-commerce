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
import minum from '../img/minum.png';
import makan from '../img/food.jpg';
import camilan from '../img/camilan.jpg';
import NagihBox from '../fragment/NagihBox';
import live from '../img/Nantikan.png';

const Home = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  const [search, setSearch] = useState('');
  const [showType, setShowType] = useState('all');

  return (
    <div>
      <Header />
      <div className="w-full">
        <Hero />
      </div>
      <div className="fixed top-[70px] w-full z-[999999] py-5 bg-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="text-black  w-[60%]  justify-center flex  mx-auto px-5 py-3 items-center  rounded-[20px] border border-blue-200 hover:border-blue-500 transition duration-300 "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <section className={`py-16 ${isDarkMode && 'bg-slate-900 text-white transition'}`}>
        <div className="container mx-auto">
          <div className="  ">
            <button className="absolute right-2 top-2 bg-blue-600 p-2 text-white rounded mt-20 mr-2" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <div className="grid  md:grid-cols-4 grid-cols-2 mx-auto w-[80%] pb-8 pt-[80px] mb-[100px]  relative border border-slate-300 rounded-[20px]  ">
              <p className="absolute top-3 left-6 font-sans text-3xl">Category</p>
              <button className="bg-orange-600 w-[80%] p-2  rounded-[20px] hover:bg-orange-400 text-white transition mx-auto duration-200 " onClick={() => setShowType('all')}>
                All
              </button>

              <button className=" p-2  rounded-[20px]  bottom-0 right-0  hover:text-white hover:bg-gray-300 transition mx-auto duration-200 hover:scale-110 " onClick={() => setShowType('drink')}>
                <img src={minum} alt="" /> Drink
              </button>

              <button className=" w-[80%] p-2 relative   rounded-[20px] transition mx-auto duration-200  hover:text-white hover:bg-gray-300 hover:scale-110" onClick={() => setShowType('food')}>
                <img src={makan} alt="" />
                <p className="absolute bottom-3 text-center w-full ">Food </p>
              </button>
              <button className=" w-[80%] p-2  rounded-[20px] hover:scale-110  transition mx-auto duration-200  hover:text-white hover:bg-gray-300  " onClick={() => setShowType('camilan')}>
                <img src={camilan} alt="" className="w-full" /> Camilan
              </button>
            </div>

            <div className="flex justify-center  w-full">
              <img src={live} alt="" className="w-3/4 rounded-[20px]" />
            </div>

            <NagihBox />
            <div className="w-5/6 mx-auto">
              {(showType === 'all' && <Product search={search} className="mb-5" />) ||
                (showType === 'drink' && <DrinkCategory search={search} />) ||
                (showType === 'food' && <FoodCategory search={search} />) ||
                (showType === 'camilan' && <CamilanCategory search={search} />)}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
